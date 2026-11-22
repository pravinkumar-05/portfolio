import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function HeroObject({ scroll }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const octaRef = useRef()

  useFrame((state, delta) => {
    const scrollOffset = scroll ? scroll.offset : 0
    
    if (meshRef.current) {
      // Rotation combined with scroll
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + scrollOffset * Math.PI
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + scrollOffset * Math.PI * 1.5
      
      // Scale slightly react to scroll
      const targetScale = 1 - scrollOffset * 0.3
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = -state.clock.getElapsedTime() * 0.25 - scrollOffset * 2
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.15 + scrollOffset * 3
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      octaRef.current.rotation.x = state.clock.getElapsedTime() * 0.4
    }
  })

  return (
    <group position={[1.5, 0, 0]}>
      {/* Gentle floating wrapper */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Core distorted 3D sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color="#7C5CFF"
            emissive="#161B2E"
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={2}
          />
        </mesh>

        {/* Orbiting accent wireframe ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.0, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>

        {/* Inner floating octahedron */}
        <mesh ref={octaRef} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#22D3EE"
            wireframe
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>
    </group>
  )
}
