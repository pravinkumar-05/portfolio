import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Github, Instagram, Linkedin, Globe } from 'lucide-react'

export default function HeroReference({ isLoaded = true }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [animateIn, setAnimateIn] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [isLoaded])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 12
      const y = (e.clientY / innerHeight - 0.5) * 10
      setMouseOffset({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-screen bg-[#EDE7DF] text-[#18181B] flex flex-col justify-between pt-16 sm:pt-20 pb-5 sm:pb-8 px-4 sm:px-8 md:px-14 overflow-hidden select-none perspective-[1200px]">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D45A43]/10 blur-[130px] pointer-events-none" />

      {/* Top micro subtitle tag */}
      <div className={`text-center w-full z-10 pt-2 sm:pt-4 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-mono">
          • Focus on High Performance Code
        </span>
      </div>

      {/* Visual Hero Centerpiece (PRAVIN + Photo + KUMAR) */}
      <div className="relative w-full flex-1 md:flex-none flex items-center justify-center min-h-[290px] max-h-[50vh] md:max-h-none md:h-auto md:static my-auto md:my-0">
        
        {/* 3D Diagonal Syne Typography: PRAVIN & KUMAR */}
        <div
          className="absolute inset-0 md:inset-auto md:top-[42%] md:left-1/2 pointer-events-none z-10 w-full md:max-w-[88vw] flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: isMobile
              ? `translate(${mouseOffset.x * -0.15}px, ${mouseOffset.y * -0.15}px) rotateZ(-3.5deg)`
              : `translate(calc(-50% + ${mouseOffset.x * -0.2}px), calc(-50% + ${mouseOffset.y * -0.2}px)) rotateX(${mouseOffset.y * -0.3}deg) rotateY(${mouseOffset.x * 0.3}deg) rotateZ(-5deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Left: PRAVIN */}
          <div className="flex-1 text-right pr-2 sm:pr-4 overflow-visible">
            <div
              className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20 sm:-translate-x-44'
              }`}
            >
              <span
                className="text-[clamp(1.75rem,5.2vw,4.8rem)] font-black uppercase tracking-tight leading-none font-['Syne'] text-[#C8705D] select-none whitespace-nowrap inline-block"
                style={{
                  textShadow: `
                    1px 1px 0px #A85444,
                    2px 2px 0px #A85444,
                    3px 3px 0px #914233,
                    4px 4px 0px #914233,
                    5px 5px 0px #783124,
                    7px 8px 14px rgba(120, 49, 36, 0.35),
                    10px 14px 22px rgba(0, 0, 0, 0.18)
                  `,
                  transform: 'translateZ(-15px)',
                }}
              >
                PRAVIN
              </span>
            </div>
          </div>

          {/* Center Gap specifically calculated for head & raised arm */}
          <div className="w-[90px] sm:w-[125px] md:w-[160px] lg:w-[190px] shrink-0 pointer-events-none" />

          {/* Right: KUMAR */}
          <div className="flex-1 text-left pl-2 sm:pl-4 overflow-visible">
            <div
              className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 sm:translate-x-44'
              }`}
            >
              <span
                className="text-[clamp(1.75rem,5.2vw,4.8rem)] font-black uppercase tracking-tight leading-none font-['Syne'] text-[#18181B] select-none whitespace-nowrap inline-block"
                style={{
                  textShadow: `
                    1px 1px 0px #32323A,
                    2px 2px 0px #32323A,
                    3px 3px 0px #24242B,
                    4px 4px 0px #24242B,
                    5px 5px 0px #16161C,
                    7px 8px 16px rgba(0, 0, 0, 0.45),
                    10px 15px 24px rgba(0, 0, 0, 0.22)
                  `,
                  transform: 'translateZ(-15px)',
                }}
              >
                KUMAR
              </span>
            </div>
          </div>
        </div>

        {/* Center Cutout Portrait (Pravin in Floral Shirt) */}
        <div
          className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 z-20 pointer-events-none flex justify-center items-end h-full max-h-[48vh] md:max-h-[740px] md:h-[74vh] transition-transform duration-200 ease-out"
          style={{
            transform: isMobile
              ? 'translateZ(20px)'
              : `translate(calc(-50% + ${mouseOffset.x * 0.25}px), ${mouseOffset.y * 0.12}px) rotateY(${mouseOffset.x * -0.2}deg) translateZ(30px)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className={`h-full w-auto transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 sm:translate-y-52 scale-95'
            }`}
          >
            <img
              src="./photos/pravin_floral_tight.png"
              alt="Pravin Kumar"
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>

      </div>

      {/* Bottom Content Row: Positioned cleanly below photo on mobile */}
      <div
        className={`relative z-30 w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8 pt-2 pb-2 md:pb-4 transition-all duration-1000 delay-200 ${
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Info Column */}
        <div className="w-full md:max-w-sm text-center md:text-left space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#18181B] tracking-tight font-['Space_Grotesk']">
            Python Developer
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed max-w-xs sm:max-w-sm mx-auto md:mx-0">
            Engineering digital systems that are fast, scalable, and performance-focused.
          </p>
          <div className="pt-1 sm:pt-2 flex justify-center md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#18181B] text-[#F3F4F6] text-xs font-bold uppercase tracking-wider hover:bg-[#333338] active:scale-95 hover:scale-105 transition-all shadow-lg shadow-black/15 group"
            >
              <span>Let's collaborate</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Social Column: clean row on mobile, column on desktop */}
        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 text-xs font-medium text-[#4A4540] pt-1 md:pt-0">
          <a
            href="https://github.com/pravinkumar-05"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 sm:gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group p-1"
          >
            <Github size={15} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/pravinkumar"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 sm:gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group p-1"
          >
            <Linkedin size={15} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 sm:gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group p-1"
          >
            <Instagram size={15} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 sm:gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group p-1"
          >
            <Globe size={15} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">Twitter / X</span>
          </a>
        </div>
      </div>
    </section>
  )
}
