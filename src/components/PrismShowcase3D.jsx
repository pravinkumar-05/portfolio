import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const items = [
  { id: 1, name: 'ROADGUARD MAHARASHTRA', tag: 'CIVIC AI & SENSORS', texture: './photos/pothole.png' },
  { id: 2, name: 'STOCK TRADING PLATFORM', tag: 'FINTECH & WEBSOCKETS', texture: './photos/stock.png' },
  { id: 3, name: 'JHAREXPLORE ENGINE', tag: 'TYPESCRIPT & GIS MAPS', texture: './photos/jhar.png' },
  { id: 4, name: 'SPATIAL 3D LAB', tag: 'WEBGL & SHADERS', texture: './photos/crafting.png' },
  { id: 5, name: 'CLOUD TELEMETRY MESH', tag: 'MICROSERVICES & DOCKER', texture: './photos/nexus.png' },
  { id: 6, name: 'PRAVIN KUMAR ARCHIVE', tag: 'OPEN SOURCE / GITHUB', texture: './photos/portrait.png' },
]

function PrismFace({ item, index, total, radius, onHover }) {
  const texture = useTexture(item.texture)
  const angle = (index / total) * Math.PI * 2
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, angle, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(item)
      }}
      onPointerOut={() => onHover(null)}
    >
      <mesh>
        <planeGeometry args={[1.9, 1.25]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.2}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Outer border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.95, 1.3]} />
        <meshBasicMaterial color="#7C5CFF" wireframe />
      </mesh>
    </group>
  )
}

export default function PrismShowcase3D({ onActiveChange }) {
  const prismRef = useRef()
  const [activeItem, setActiveItem] = useState(items[0])
  const radius = 2.4

  useFrame((state, delta) => {
    if (prismRef.current) {
      prismRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <group ref={prismRef}>
        {items.map((item, idx) => (
          <PrismFace
            key={item.id}
            item={item}
            index={idx}
            total={items.length}
            radius={radius}
            onHover={(item) => {
              if (item) {
                setActiveItem(item)
                if (onActiveChange) onActiveChange(item)
              }
            }}
          />
        ))}

        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#22D3EE" wireframe />
        </mesh>
      </group>
    </group>
  )
}
