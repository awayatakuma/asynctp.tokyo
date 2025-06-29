'use client'

import { type VRM, VRMLoaderPlugin } from '@pixiv/three-vrm'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface VRMModelProps {
  url: string
}

export const VRMModel = ({ url }: VRMModelProps) => {
  const vrmRef = useRef<VRM | null>(null)

  // VRMファイルをロード
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser))
  })

  // VRMを取得
  const vrm = gltf.userData.vrm as VRM
  vrmRef.current = vrm

  // アニメーションループ
  useFrame((state, delta) => {
    if (vrmRef.current) {
      // 簡単な揺れアニメーション
      vrmRef.current.scene.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1

      // VRMアップデート
      vrmRef.current.update(delta)
    }
  })

  return <primitive object={vrm.scene} />
}
