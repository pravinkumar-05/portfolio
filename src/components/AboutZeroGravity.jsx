import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function AboutZeroGravity() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isRevealed, setIsRevealed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [photoHover, setPhotoHover] = useState(false)
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  const photoRef = useRef(null)

  const handlePhotoMouseMove = (e) => {
    if (!photoRef.current) return
    const rect = photoRef.current.getBoundingClientRect()
    setLensPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 16
      const y = (e.clientY / innerHeight - 0.5) * 12
      setMouseOffset({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
        }
      },
      { threshold: 0.18 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight
      if (rect.top < windowH && rect.bottom > 0) {
        const rawProgress = (windowH - rect.top) / (windowH + rect.height * 0.7)
        const clamped = Math.min(Math.max(rawProgress, 0), 1)
        setScrollProgress(clamped)
        if (clamped > 0.15) {
          setIsRevealed(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Safety fallback: ensure revealed within 600ms
    const timer = setTimeout(() => setIsRevealed(true), 600)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-14 bg-[#222222] text-white overflow-hidden select-none border-t border-b border-white/10 perspective-[1200px]"
    >
      {/* 1. Starry Night / Engraved Landscape Background from Video 2 (00:04) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
        <img
          src="./photos/starry_night_etched.png"
          alt="Starry Night Backdrop"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]" />
      </div>

      {/* Volumetric Spotlight Glow angled from top right onto the cutout */}
      <div className="absolute top-10 right-1/4 w-[450px] h-[450px] bg-white/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

        {/* Giant Flanking ABOUT [ SUIT CUTOUT IN 3D FORMAT ] ME with Slide Out from Behind Back */}
        <div className="relative w-full flex items-center justify-center min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[520px] mb-4">

          {/* Background 3D Typography Layer: ABOUT & ME (Starts behind back and slides out to both sides) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 w-full transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mouseOffset.x * -0.2}px, ${mouseOffset.y * -0.2}px) rotateX(${mouseOffset.y * -0.3}deg) rotateY(${mouseOffset.x * 0.3}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Left: ABOUT — Starts tucked behind back (shifted right to center), then slides out to LEFT */}
            <div className="flex-1 text-right pr-2 sm:pr-4 md:pr-6 overflow-visible">
              <span
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none font-['Syne'] text-white select-none whitespace-nowrap inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  textShadow: `
                    1px 1px 0px #3a3a3a,
                    2px 2px 0px #303030,
                    3px 3px 0px #242424,
                    4px 4px 0px #1c1c1c,
                    5px 5px 0px #141414,
                    6px 12px 24px rgba(0, 0, 0, 0.75)
                  `,
                  transform: isRevealed
                    ? 'translateX(0px) translateZ(-20px) scale(1)'
                    : 'translateX(min(14vw, 90px)) translateZ(-50px) scale(0.9)',
                  opacity: isRevealed ? 1 : 0.2,
                }}
              >
                ABOUT
              </span>
            </div>

            {/* Center Gap specifically calculated for suit portrait */}
            <div className="w-[140px] sm:w-[190px] md:w-[240px] lg:w-[280px] shrink-0 pointer-events-none" />

            {/* Right: ME — Starts tucked behind back (shifted left to center), then slides out to RIGHT */}
            <div className="flex-1 text-left pl-2 sm:pl-4 md:pl-6 overflow-visible">
              <span
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none font-['Syne'] text-white select-none whitespace-nowrap inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  textShadow: `
                    1px 1px 0px #3a3a3a,
                    2px 2px 0px #303030,
                    3px 3px 0px #242424,
                    4px 4px 0px #1c1c1c,
                    5px 5px 0px #141414,
                    6px 12px 24px rgba(0, 0, 0, 0.75)
                  `,
                  transform: isRevealed
                    ? 'translateX(0px) translateZ(-20px) scale(1)'
                    : 'translateX(max(-14vw, -90px)) translateZ(-50px) scale(0.9)',
                  opacity: isRevealed ? 1 : 0.2,
                }}
              >
                ME
              </span>
            </div>
          </div>

          {/* Foreground 3D Cutout (Pravin in Suit & Sunglasses) - Monochrome with Seamless Cursor Color Reveal */}
          <div
            ref={photoRef}
            onMouseEnter={() => setPhotoHover(true)}
            onMouseLeave={() => setPhotoHover(false)}
            onMouseMove={handlePhotoMouseMove}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-crosshair group flex justify-center items-end h-[330px] sm:h-[390px] md:h-[450px] lg:h-[490px] transition-transform duration-200 ease-out"
            style={{
              transform: `translate(calc(-50% + ${mouseOffset.x * 0.3}px), ${mouseOffset.y * 0.15}px) rotateY(${mouseOffset.x * -0.25}deg) rotateX(${mouseOffset.y * 0.15}deg) translateZ(40px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 1. Base Monochrome (Grayscale) Image - Clean 3D sticker cutout with zero bottom line */}
            <img
              src="./photos/pravin_suit_v7.png"
              alt="Pravin Kumar - Suit (Monochrome)"
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter grayscale contrast-110 brightness-95"
            />

            {/* 2. Color Reveal Layer: Masked strictly around cursor position */}
            <img
              src="./photos/pravin_suit_v7.png"
              alt="Pravin Kumar - Suit (Color Reveal)"
              className="absolute inset-0 w-full h-full object-contain object-bottom filter contrast-105 pointer-events-none transition-opacity duration-200"
              style={{
                opacity: photoHover ? 1 : 0,
                WebkitMaskImage: photoHover
                  ? `radial-gradient(circle 120px at ${lensPos.x}px ${lensPos.y}px, black 40%, rgba(0,0,0,0.4) 75%, transparent 100%)`
                  : 'none',
                maskImage: photoHover
                  ? `radial-gradient(circle 120px at ${lensPos.x}px ${lensPos.y}px, black 40%, rgba(0,0,0,0.4) 75%, transparent 100%)`
                  : 'none',
              }}
            />
          </div>

        </div>

        {/* Lower Info & Vision Statement Box from Video 2 (00:06) */}
        <div className="w-full max-w-4xl bg-[#2A2A2A]/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl mt-4 relative z-30">
          {/* Top Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 mb-6 text-xs font-mono text-gray-400 gap-2">
            <span className="uppercase tracking-[0.25em] text-[#22D3EE] font-bold">
              TURNING VISIONARY IDEAS INTO FAST, INTUITIVE, DISTINCTIVE DIGITAL EXPERIENCES
            </span>
            <span className="text-gray-400 uppercase tracking-widest shrink-0">
              INDIA — 2026 • SELECTED WORKS
            </span>
          </div>

          {/* Main Description */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-mono text-[#C8705D] uppercase tracking-wider block font-bold">
                ABOUT PRAVIN KUMAR // PYTHON DEVELOPER
              </span>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Specializing in building expressive web applications and distributed architectures. Focusing on performance-driven backends, WebGL 3D interfaces with intentional motion, responsive design, and measurable impact.
              </p>
            </div>

            {/* Action Buttons from Video 2 (00:06) */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <a
                href="#services"
                className="w-full text-center py-3 px-6 rounded-full bg-white text-[#222222] font-bold text-xs uppercase tracking-wider hover:bg-gray-200 hover:scale-105 transition-all shadow-md"
              >
                SERVICES
              </a>
              <a
                href="#projects"
                className="w-full text-center py-3 px-6 rounded-full bg-transparent border border-white/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>VIEW WORKS</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Animated Marquee / Experience Ticker (Video 2 at 00:07 - 00:10) */}
        <div className="w-full overflow-hidden mt-14 border-t border-b border-white/10 py-4 opacity-75">
          <div className="flex gap-8 whitespace-nowrap animate-marquee text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
            <span>WHERE I'VE BEEN</span>
            <span className="text-[#22D3EE]">•</span>
            <span>CREATIVE TECHNOLOGIST</span>
            <span className="text-[#C8705D]">•</span>
            <span>PYTHON DEVELOPER</span>
            <span className="text-[#22D3EE]">•</span>
            <span>2023 — PRESENT</span>
            <span className="text-[#C8705D]">•</span>
            <span>CIVIC AI & SYSTEM ARCHITECTURE</span>
            <span className="text-[#22D3EE]">•</span>
            <span>WHERE I'VE BEEN</span>
            <span className="text-[#22D3EE]">•</span>
            <span>CREATIVE TECHNOLOGIST</span>
            <span className="text-[#C8705D]">•</span>
            <span>PYTHON DEVELOPER</span>
          </div>
        </div>

      </div>
    </section>
  )
}
