'use client'

import { type VRM, VRMLoaderPlugin } from '@pixiv/three-vrm'
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

  // 表情設定
  const setFacialExpression = (vrm: VRM) => {
    if (!vrm.expressionManager) return

    // 笑顔を設定
    vrm.expressionManager.setValue('joy', 0.7) // 0-1の値で強さを調整
  }

  useFrame((_state, delta) => {
    if (vrmRef.current) {
      setAnimationTime((prev) => prev + delta)

      // 常に笑顔を設定
      setFacialExpression(vrmRef.current)

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
