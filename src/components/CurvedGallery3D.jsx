import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export const pravinProjects = [
  {
    id: 1,
    title: 'ROADGUARD MAHARASHTRA',
    category: 'CIVIC AI / GEOSPATIAL',
    texture: './photos/pothole.png',
    github: 'https://github.com/pravinkumar-05/pothole-reporter',
    desc: 'Real-time pothole detection and road safety reporting system engineered for municipal infrastructure with geolocation telemetry and automated dispatch notifications.',
    tech: ['JavaScript', 'Leaflet / Maps', 'Geo-JSON', 'Node.js'],
  },
  {
    id: 2,
    title: 'STOCK TRADING PLATFORM',
    category: 'FULL-STACK FINTECH',
    texture: './photos/stock.png',
    github: 'https://github.com/pravinkumar-05/stock-trading-platform',
    desc: 'High-performance interactive financial platform featuring live candlestick charting, real-time market data streaming, order book simulations, and portfolio tracking.',
    tech: ['JavaScript', 'WebSockets', 'Trading Engine', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'JHAREXPLORE',
    category: 'CULTURAL HERITAGE TECH',
    texture: './photos/jhar.png',
    github: 'https://github.com/pravinkumar-05/JharExplore',
    desc: 'Modern cultural and eco-tourism discovery web platform for Jharkhand, showcasing immersive guides, interactive destination maps, and regional artisan highlights.',
    tech: ['TypeScript', 'React', 'Next.js', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'SPATIAL 3D WEB LAB',
    category: 'CREATIVE TECH',
    texture: './photos/crafting.png',
    github: 'https://github.com/pravinkumar-05',
    desc: 'Interactive 3D WebGL laboratory exploring physical particle shaders, curved cylindrical carousels, and responsive hardware-accelerated animations.',
    tech: ['Three.js', 'React Three Fiber', 'GLSL', 'GSAP'],
  },
  {
    id: 5,
    title: 'DISTRIBUTED CLOUD TELEMETRY',
    category: 'SYSTEM INFRASTRUCTURE',
    texture: './photos/nexus.png',
    github: 'https://github.com/pravinkumar-05',
    desc: 'Scalable event-driven message architecture designed for sub-millisecond edge routing, distributed caching, and zero-downtime rolling deploys.',
    tech: ['Node.js', 'Docker', 'Redis', 'AWS'],
  },
]

function ProjectCard({ index, total, project, currentRotation, isMobile, onSelect }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(project.texture)

  const radius = isMobile ? 4.2 : 5.5
  const angleSpread = isMobile ? 0.65 : 0.55
  const baseAngle = (index - (total - 1) / 2) * angleSpread

  useFrame((state) => {
    if (!meshRef.current) return
    const effectiveAngle = baseAngle + currentRotation
    
    const x = Math.sin(effectiveAngle) * radius
    const z = Math.cos(effectiveAngle) * radius - radius + (isMobile ? 0.2 : 0.5)
    const y = Math.sin(state.clock.getElapsedTime() * 1.5 + index * 0.8) * 0.08

    meshRef.current.position.set(x, y, z)
    meshRef.current.rotation.y = effectiveAngle * 0.9

    const targetScale = hovered ? (isMobile ? 1.04 : 1.08) : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1)
  })

  const cardWidth = isMobile ? 2.2 : 2.8
  const cardHeight = isMobile ? 1.45 : 1.8

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(project)
      }}
    >
      {/* 3D Curved Plane */}
      <mesh>
        <planeGeometry args={[cardWidth, cardHeight, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.2}
          metalness={0.1}
          emissive={hovered ? '#7C5CFF' : '#000000'}
          emissiveIntensity={hovered ? 0.35 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[cardWidth + 0.06, cardHeight + 0.06]} />
        <meshBasicMaterial
          color={hovered ? '#22D3EE' : '#161B2E'}
          wireframe={hovered}
        />
      </mesh>
    </group>
  )
}

export default function CurvedGallery3D({ onSelectProject }) {
  const { width } = useThree((state) => state.viewport)
  const isMobile = width < 7
  const groupRef = useRef()
  const [rotation, setRotation] = useState(0)
  const isInteracting = useRef(false)
  const prevPos = useRef(0)

  useFrame((state) => {
    if (!isInteracting.current) {
      setRotation((prev) => prev + Math.sin(state.clock.getElapsedTime() * 0.35) * 0.0004)
    }
  })

  const handleStart = (clientX) => {
    isInteracting.current = true
    prevPos.current = clientX
  }

  const handleMove = (clientX) => {
    if (!isInteracting.current) return
    const delta = (clientX - prevPos.current) * 0.003
    setRotation((prev) => Math.max(-1.1, Math.min(1.1, prev + delta)))
    prevPos.current = clientX
  }

  const handleEnd = () => {
    isInteracting.current = false
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => handleStart(e.clientX)}
      onPointerMove={(e) => handleMove(e.clientX)}
      onPointerUp={handleEnd}
      onPointerLeave={handleEnd}
      onTouchStart={(e) => e.touches?.[0] && handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => e.touches?.[0] && handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {pravinProjects.map((p, idx) => (
        <ProjectCard
          key={p.id}
          index={idx}
          total={pravinProjects.length}
          project={p}
          currentRotation={rotation}
          isMobile={isMobile}
          onSelect={(proj) => onSelectProject && onSelectProject(proj)}
        />
      ))}
    </group>
  )
}
