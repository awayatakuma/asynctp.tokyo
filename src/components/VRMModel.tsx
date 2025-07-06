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

  // 表情変化用の状態
  const lastExpressionChangeRef = useRef(0)
  const expressionChangeInterval = 5000 // 5秒間隔
  const currentExpressionRef = useRef('joy')
  const availableExpressionsRef = useRef<string[]>([])
  const isExpressionsInitializedRef = useRef(false)

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
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
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

  // 利用可能な表情を初期化
  const initializeExpressions = (vrm: VRM) => {
    if (!vrm.expressionManager || isExpressionsInitializedRef.current) return

    const availableExpressions: string[] = []
    const standardExpressions = [
      VRMExpressionPresetName.Happy,
      VRMExpressionPresetName.Angry,
      VRMExpressionPresetName.Sad,
      VRMExpressionPresetName.Relaxed,
      VRMExpressionPresetName.Neutral,
    ]

    // 実際に存在する表情のみを追加
    for (const expr of standardExpressions) {
      try {
        vrm.expressionManager.setValue(expr, 0)
        availableExpressions.push(expr)
      } catch {
        // 存在しない表情は無視
      }
    }

    availableExpressionsRef.current = availableExpressions
    isExpressionsInitializedRef.current = true
    console.log('Available expressions:', availableExpressions)
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

  // 表情変化処理
  const updateExpressions = (vrm: VRM, currentTime: number) => {
    if (!vrm.expressionManager || availableExpressionsRef.current.length === 0)
      return

    // 表情変化のタイミングをチェック
    if (
      currentTime - lastExpressionChangeRef.current >
      expressionChangeInterval
    ) {
      // 現在の表情をリセット
      if (currentExpressionRef.current !== 'neutral') {
        vrm.expressionManager.setValue(currentExpressionRef.current, 0)
      }

      // 新しい表情をランダム選択（70%の確率で表情変化）
      if (Math.random() > 0.3) {
        const randomIndex = Math.floor(
          Math.random() * availableExpressionsRef.current.length
        )
        const newExpression = availableExpressionsRef.current[randomIndex]
        const intensity = 0.4 + Math.random() * 0.5 // 0.4-0.9の強度

        currentExpressionRef.current = newExpression
        vrm.expressionManager.setValue(newExpression, intensity)
        console.log(
          `Setting expression: ${newExpression} with intensity: ${intensity}`
        )
      } else {
        currentExpressionRef.current = 'neutral'
      }

      lastExpressionChangeRef.current = currentTime
    }
  }

  useFrame((_state, delta) => {
    if (vrmRef.current) {
      const currentTime = Date.now()
      setAnimationTime((prev) => prev + delta)

      // 表情を初期化（一度だけ）
      initializeExpressions(vrmRef.current)

      // 表情変化処理
      updateExpressions(vrmRef.current, currentTime)

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
