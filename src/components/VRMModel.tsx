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
}

export const VRMModel = ({ url, animationUrl }: VRMModelProps) => {
  const vrmRef = useRef<VRM | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const [_animationTime, setAnimationTime] = useState(0)
  const [animationAction, setAnimationAction] =
    useState<THREE.AnimationAction | null>(null)

  // 瞬き用の状態
  const lastBlinkTimeRef = useRef(0)
  const blinkInterval = 3000 // 3秒間隔
  const blinkDuration = 150 // 150ms

  // 表情固定用の状態
  const isSmileSetRef = useRef(false)

  // カメラ情報を取得
  const { camera } = useThree()

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

  // カメラを見る機能
  const lookAtCamera = (vrm: VRM) => {
    if (!vrm.lookAt) return

    // カメラの位置を取得
    const cameraPosition = camera.position.clone()

    // VRMの位置からカメラへのベクトルを計算
    const vrmPosition = vrm.scene.position
    const lookDirection = cameraPosition.sub(vrmPosition).normalize()

    // 視線をカメラに向ける
    vrm.lookAt.lookAt(lookDirection)
  }

  // 微笑み表情を設定
  const _setSmileExpression = (vrm: VRM) => {
    if (!vrm.expressionManager || isSmileSetRef.current) return

    vrm.expressionManager.setValue(VRMExpressionPresetName.Relaxed, 1)
    isSmileSetRef.current = true
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

      // 微笑み表情を設定（一度だけ）
      _setSmileExpression(vrmRef.current)

      // 瞬き処理
      updateBlinking(vrmRef.current, currentTime)

      // カメラを見る
      lookAtCamera(vrmRef.current)

      if (mixerRef.current && animationAction && animationUrl) {
        // アニメーションミキサーを更新
        mixerRef.current.update(delta)
      }

      vrmRef.current.update(delta)
    }
  })

  return <primitive object={vrm.scene} />
}
