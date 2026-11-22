import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import HeroObject from './HeroObject'

function CameraRig() {
  const scroll = useScroll()
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0, 5))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 3, 1 / 3)
    const r2 = scroll.range(1 / 3, 1 / 3)
    const r3 = scroll.range(2 / 3, 1 / 3)

    // Camera paths based on Drei's scroll progression
    if (scroll.offset < 0.33) {
      // Stage 1: Hero position
      targetPos.current.set(0, -scroll.offset * 2, 5 - scroll.offset * 2)
      targetLookAt.current.set(0.5, 0, 0)
    } else if (scroll.offset < 0.66) {
      // Stage 2: Side view / inspection
      targetPos.current.set(Math.sin(scroll.offset * Math.PI) * 4, -scroll.offset * 3, 4)
      targetLookAt.current.set(0, -scroll.offset * 2, 0)
    } else {
      // Stage 3: Dynamic high-angle view
      targetPos.current.set(-1, -scroll.offset * 4, 3.5)
      targetLookAt.current.set(0, -scroll.offset * 3.5, 0)
    }

    // Smooth lerp camera translation and orientation
    camera.position.lerp(targetPos.current, 0.05)
    
    const currentLook = new THREE.Vector3()
    camera.getWorldDirection(currentLook)
    camera.lookAt(targetLookAt.current)
  })

  return (
    <>
      <HeroObject scroll={scroll} />
      <Sparkles count={80} scale={10} size={2} speed={0.4} opacity={0.6} color="#22D3EE" />
      <Sparkles count={50} scale={12} size={3} speed={0.3} opacity={0.4} color="#7C5CFF" />
    </>
  )
}

export default function Scene() {
  return (
    <>
      {/* Balanced lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, 5, -2]} intensity={2.5} color="#7C5CFF" distance={15} />
      <pointLight position={[5, -5, 2]} intensity={2.0} color="#22D3EE" distance={15} />
      
      {/* Scene Content with Drei Camera & Scroll Controller */}
      <CameraRig />
    </>
  )
}
