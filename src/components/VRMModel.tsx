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
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface VRMModelProps {
  url: string
  animationUrl?: string
  onVRMLoad?: (vrm: VRM) => void
}

export const VRMModel = ({ url, animationUrl, onVRMLoad }: VRMModelProps) => {
  const vrmRef = useRef<VRM | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const [_animationTime, setAnimationTime] = useState(0)
  const [animationAction, setAnimationAction] =
    useState<THREE.AnimationAction | null>(null)

  // 瞬き用の状態
  const lastBlinkTimeRef = useRef(0)
  const blinkInterval = 3000 // 3秒間隔
  const blinkDuration = 150 // 150ms

  // マウス追従用の状態
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

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

  // Callback when VRM is loaded
  useEffect(() => {
    if (vrm && onVRMLoad) {
      onVRMLoad(vrm)
    }
  }, [vrm, onVRMLoad])

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
  const lookAtMouse = (vrm: VRM) => {
    if (!vrm.lookAt) return

    // マウスの正規化座標からワールド座標を計算
    const vector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5)
    vector.unproject(camera)

    // VRMの位置からマウス方向へのベクトルを計算
    const vrmPosition = vrm.scene.position
    const lookDirection = vector.sub(vrmPosition).normalize()

    // 視線をマウス方向に向ける
    vrm.lookAt.lookAt(lookDirection)
  }

  // ホバー時の表情変更
  const updateExpression = (vrm: VRM) => {
    if (!vrm.expressionManager) return

    if (isHovering) {
      vrm.expressionManager.resetValues()
      vrm.expressionManager.setValue(VRMExpressionPresetName.Angry, 1.0)
      vrm.expressionManager.setValue(VRMExpressionPresetName.Aa, 0.5)
    } else {
      vrm.expressionManager.resetValues()
      vrm.expressionManager.setValue(VRMExpressionPresetName.Relaxed, 1.0)
    }
  }

  // 瞬き処理
  const updateBlinking = (vrm: VRM, currentTime: number) => {
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
  }

  useFrame((_state, delta) => {
    if (vrmRef.current) {
      const currentTime = Date.now()
      setAnimationTime((prev) => prev + delta)

      // 瞬き処理
      updateBlinking(vrmRef.current, currentTime)

      // マウス追従
      lookAtMouse(vrmRef.current)

      // ホバー時の表情変更
      updateExpression(vrmRef.current)

      if (mixerRef.current && animationAction && animationUrl) {
        // アニメーションミキサーを更新
        mixerRef.current.update(delta)
      }

      vrmRef.current.update(delta)
    }
  })

  // マウスイベントリスナーの設定
  useEffect(() => {
    const canvas = gl.domElement

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [gl])

  return <primitive object={vrm.scene} />
}
