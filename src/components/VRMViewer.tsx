'use client'

import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import type { VRMViewerProps } from '@/types/components'
import { VRMModel } from './VRMModel'

export const VRMViewer: React.FC<VRMViewerProps> = ({
  vrmUrl,
  vrmaUrl,
  width = '100%',
  height = '500px',
}) => {
  return (
    <div style={{ width, height, position: 'relative' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{
          position: [0, 1, -2.5],
          fov: 35,
        }}
        dpr={
          typeof window !== 'undefined'
            ? Math.min(window.devicePixelRatio, 2)
            : 1
        }
      >
        <Suspense fallback={null}>
          <VRMModel url={vrmUrl} animationUrl={vrmaUrl} />
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
