'use client'

import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { VRMModel } from '@/components'

interface VRMViewerProps {
  vrmUrl: string
  vrmaUrl: string
  width?: string | number
  height?: string | number
}

export const VRMViewer = ({
  vrmUrl,
  vrmaUrl,
  width = '100%',
  height = '500px',
}: VRMViewerProps) => {
  return (
    <div style={{ width, height }}>
      <Canvas
        camera={{
          position: [-2, 1.5, -3],
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          <VRMModel url={vrmUrl} animationUrl={vrmaUrl} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1}
            maxDistance={5}
            target={[0, 1, 0]}
          />
          {/* environment */}
          <Environment preset="sunset" />
          <ambientLight intensity={1} />
          <directionalLight
            position={[0, 2, 3]}
            intensity={1}
            color="#ffedd5"
          />
          <pointLight position={[2, 2, 0]} intensity={2} color="#ffd700" />
          <directionalLight
            position={[0, 1, 4]}
            intensity={2}
            color="#fff8f0"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
