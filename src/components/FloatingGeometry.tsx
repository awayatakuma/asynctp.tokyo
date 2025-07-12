'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { type Group, Matrix4, Vector3 } from 'three'

interface FloatingGeometryProps {
  count?: number
  speed?: number
  spread?: number
}

export const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  count = 8,
  speed = 1,
}) => {
  const groupRef = useRef<Group>(null)

  interface GeometryConfig {
    id: number
    type: string
    initialPosition: [number, number, number]
    position: [number, number, number]
    rotation: [number, number, number]
    rotationSpeed: [number, number, number]
    orbitSpeed: number
    floatSpeed: number
    scale: number
    color: string
    opacity: number
  }

  // 幾何学的図形の設定
  const geometries: GeometryConfig[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // 3次元的に配置するための球面座標（まんべんなく分布）
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count) // 緯度角度
      const theta = Math.PI * (1 + Math.sqrt(5)) * i // 経度角度（黄金角）
      const radius = 0.8 + Math.random() * 0.5 // VRMから0.8-1.3の距離

      // 球面座標から直交座標に変換
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.cos(phi) * 0.8 + 1.2 // Y軸を少し上に調整
      const z = radius * Math.sin(phi) * Math.sin(theta)

      return {
        id: i,
        type: ['box', 'sphere', 'octahedron', 'tetrahedron'][i % 4],
        initialPosition: [x, y, z] as [number, number, number],
        position: [x, y, z] as [number, number, number],
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
        orbitSpeed: 0.1 + Math.random() * 1, // 公転速度
        floatSpeed: 0.3 + Math.random() * 0.3,
        scale: 0.08 + Math.random() * 0.12,
        color: `hsl(${(i * 45) % 360}, 70%, 60%)`,
        opacity: 0.3 + Math.random() * 0.4,
      }
    })
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    groupRef.current.children.forEach((child, index: number) => {
      const config = geometries[index]

      // VRMを中心とした公転運動
      const orbitAngle = time * config.orbitSpeed
      const rotationMatrix = new Matrix4().makeRotationY(orbitAngle)
      const initialPos = new Vector3(...config.initialPosition)
      initialPos.applyMatrix4(rotationMatrix)

      // 微細な浮遊運動を追加
      child.position.x =
        initialPos.x + Math.sin(time * config.floatSpeed + index) * 0.1
      child.position.y =
        initialPos.y + Math.cos(time * config.floatSpeed + index * 0.7) * 0.1
      child.position.z =
        initialPos.z + Math.cos(time * config.floatSpeed + index * 0.3) * 0.1

      // 自転
      child.rotation.x += config.rotationSpeed[0] * speed
      child.rotation.y += config.rotationSpeed[1] * speed
      child.rotation.z += config.rotationSpeed[2] * speed
    })
  })

  const renderGeometry = (type: string, config: GeometryConfig) => {
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
