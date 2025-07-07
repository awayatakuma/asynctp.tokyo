'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type * as THREE from 'three'

interface FloatingGeometryProps {
  count?: number
  speed?: number
  spread?: number
}

export const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  count = 8,
  speed = 1,
  spread = 3,
}) => {
  const groupRef = useRef<THREE.Group>(null)

  // 幾何学的図形の設定
  const geometries = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // VRMから離れた位置に配置するための角度ベースの位置計算
      const angle = (i / count) * Math.PI * 2
      const distance = 0.8 + Math.random() * 0.7 // VRMから0.8-1.5の距離
      const x = Math.cos(angle) * distance
      const z = Math.sin(angle) * distance

      return {
        id: i,
        type: ['box', 'sphere', 'octahedron', 'tetrahedron'][i % 4],
        position: [
          x + (Math.random() - 0.5) * 0.5, // 少しランダムさを追加
          Math.random() * 2 + 0.5,
          z + (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ] as [number, number, number],
        floatSpeed: 0.5 + Math.random() * 0.5,
        scale: 0.08 + Math.random() * 0.12,
        color: `hsl(${(i * 45) % 360}, 70%, 60%)`,
        opacity: 0.3 + Math.random() * 0.4,
      }
    })
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    groupRef.current.children.forEach((child, index) => {
      const config = geometries[index]

      // 浮遊運動
      child.position.y =
        config.position[1] + Math.sin(time * config.floatSpeed + index) * 0.3
      child.position.x = config.position[0] + Math.cos(time * 0.3 + index) * 0.2
      child.position.z = config.position[2] + Math.sin(time * 0.4 + index) * 0.2

      // 回転
      child.rotation.x += config.rotationSpeed[0] * speed
      child.rotation.y += config.rotationSpeed[1] * speed
      child.rotation.z += config.rotationSpeed[2] * speed
    })
  })

  const renderGeometry = (type: string, config: any) => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[config.scale, config.scale, config.scale]} />
      case 'sphere':
        return <sphereGeometry args={[config.scale, 8, 6]} />
      case 'octahedron':
        return <octahedronGeometry args={[config.scale]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[config.scale]} />
      default:
        return <boxGeometry args={[config.scale, config.scale, config.scale]} />
    }
  }

  return (
    <group ref={groupRef}>
      {geometries.map((config) => (
        <mesh
          key={config.id}
          position={config.position}
          rotation={config.rotation}
        >
          {renderGeometry(config.type, config)}
          <meshStandardMaterial
            color={config.color}
            transparent
            opacity={config.opacity}
            emissive={config.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}
