'use client'

import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import type { VRMViewerProps } from '@/types/components'
import { FloatingGeometry } from './FloatingGeometry'
import { VRMModel } from './VRMModel'

export const VRMViewer: React.FC<VRMViewerProps> = ({
  vrmUrl,
  vrmaUrl,
  width = '100%',
  height = '500px',
}) => {
  // シンプルに文字列値のみ対応
  const resolvedWidth = typeof width === 'string' ? width : '100%'
  const resolvedHeight = typeof height === 'string' ? height : '500px'

  return (
    <div
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
      }}
    >
      <Canvas
        camera={{
          position: [0, 1.4, -2.2],
          fov: 55,
        }}
        dpr={1}
      >
        <Suspense fallback={null}>
          {/* VRMモデル */}
          <VRMModel url={vrmUrl} animationUrl={vrmaUrl} />

          {/* 幾何学的パーティクル */}
          <FloatingGeometry count={6} speed={0.8} spread={2.5} />

          {/* カメラ・環境・ライティング */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            target={[0, 1, 0]}
            autoRotate={false}
          />
          <Environment preset="park" />
          <ambientLight intensity={1} />
          <directionalLight
            position={[0, 2, 3]}
            intensity={1}
            color="#ffedd5"
          />
          <pointLight position={[2, 2, 0]} intensity={2} color="#ffd700" />
        </Suspense>
      </Canvas>
    </div>
  )
}
