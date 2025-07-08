'use client'

import {
  type VRM,
  VRMExpressionPresetName,
  VRMLoaderPlugin,
} from '@pixiv/three-vrm'
import {
  createVRMAnimationClip,
  type VRMAnimation,
  VRMAnimationLoaderPlugin,
} from '@pixiv/three-vrm-animation'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface VRMModelProps {
  url: string
  animationUrl?: string
}

export const VRMModel = ({ url, animationUrl }: VRMModelProps) => {
  const vrmRef = useRef<VRM | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const [animationAction, setAnimationAction] =
    useState<THREE.AnimationAction | null>(null)

  // 瞬き用の状態
  const lastBlinkTimeRef = useRef(0)
  const blinkInterval = 3000 // 3秒間隔
  const blinkDuration = 150 // 150ms

  // マウス追従用の状態
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // カメラ情報を取得
  const { camera, gl } = useThree()

  // VRMモデルを読み込み
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser))
  })

  // .vrmaアニメーションを読み込み
  const vrmaGltf = useLoader(GLTFLoader, animationUrl || url, (loader) => {
    if (animationUrl) {
      loader.register((parser) => new VRMAnimationLoaderPlugin(parser))
    } else {
      loader.register((parser) => new VRMLoaderPlugin(parser))
    }
  })

  const vrm = gltf.userData.vrm as VRM
  vrmRef.current = vrm

  // アニメーションを設定
  useEffect(() => {
    if (vrm && animationUrl && vrmaGltf?.userData.vrmAnimations) {
      const vrmAnimation = vrmaGltf.userData.vrmAnimations[0] as VRMAnimation

      const mixer = new THREE.AnimationMixer(vrm.scene)
      mixerRef.current = mixer

      const clip = createVRMAnimationClip(vrmAnimation, vrm)

      const action = mixer.clipAction(clip)
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()

      setAnimationAction(action)
    }
  }, [vrm, vrmaGltf, animationUrl])

  // マウス追従機能
  const lookAtMouse = useCallback(
    (vrm: VRM) => {
      if (!vrm.lookAt) return

      // マウスの正規化座標からワールド座標を計算
      const vector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5)
      vector.unproject(camera)

      // VRMの位置からマウス方向へのベクトルを計算
      const vrmPosition = vrm.scene.position
      const lookDirection = vector.sub(vrmPosition).normalize()

      // 視線をマウス方向に向ける
      vrm.lookAt.lookAt(lookDirection)
    },
    [mousePosition, camera]
  )

  // Relaxed表情を一度だけ設定
  useEffect(() => {
    if (vrm?.expressionManager) {
      vrm.expressionManager.setValue(VRMExpressionPresetName.Relaxed, 1.0)
    }
  }, [vrm])

  // 瞬き処理
  const updateBlinking = useCallback((vrm: VRM, currentTime: number) => {
    if (!vrm.expressionManager) return

    // まばたきのタイミングをチェック
    if (currentTime - lastBlinkTimeRef.current > blinkInterval) {
      lastBlinkTimeRef.current = currentTime
    }

    // まばたきアニメーション
    const timeSinceBlink = currentTime - lastBlinkTimeRef.current
    if (timeSinceBlink < blinkDuration) {
      const blinkProgress = timeSinceBlink / blinkDuration
      const blinkValue = Math.sin(blinkProgress * Math.PI)
      vrm.expressionManager.setValue('blink', blinkValue)
    } else {
      vrm.expressionManager.setValue('blink', 0)
    }
  }, [])

  useFrame((_state, delta) => {
    if (vrmRef.current) {
      const currentTime = Date.now()

      // 瞬き処理
      updateBlinking(vrmRef.current, currentTime)

      // マウス追従
      lookAtMouse(vrmRef.current)

      if (mixerRef.current && animationAction && animationUrl) {
        // アニメーションミキサーを更新
        mixerRef.current.update(delta)
      }

      vrmRef.current.update(delta)
    }
  })

  // マウスイベントリスナーの設定（デスクトップのみ）
  useEffect(() => {
    // モバイルデバイスでは無効化
    if (
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    ) {
      return
    }

    const canvas = gl.domElement

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      setMousePosition({ x, y })
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gl])

  return <primitive object={vrm.scene} scale={1.1} />
}
