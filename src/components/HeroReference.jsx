import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Github, Instagram, Linkedin, Globe } from 'lucide-react'

export default function HeroReference({ isLoaded = true }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
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
    <section className="relative w-full min-h-screen bg-[#EDE7DF] text-[#18181B] flex flex-col justify-between pt-20 pb-8 px-4 sm:px-8 md:px-14 overflow-hidden select-none perspective-[1200px]">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D45A43]/10 blur-[130px] pointer-events-none" />

      {/* Top micro subtitle tag from reference */}
      <div className={`text-center w-full z-10 pt-4 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C827A] font-mono">
          • Focus on High Performance Code
        </span>
      </div>

      {/* 3D Diagonal Syne Typography with Cinematic Opposing Slides */}
      <div
        className="absolute top-[36%] sm:top-[40%] md:top-[42%] left-1/2 pointer-events-none z-10 w-full max-w-[94vw] sm:max-w-[88vw] flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * -0.2}px), calc(-50% + ${mouseOffset.y * -0.2}px)) rotateX(${mouseOffset.y * -0.3}deg) rotateY(${mouseOffset.x * 0.3}deg) rotateZ(-5deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Left: PRAVIN slides in from LEFT to RIGHT */}
        <div className="flex-1 text-right pr-1 sm:pr-4 overflow-visible">
          <div
            className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-28 sm:-translate-x-44'
            }`}
          >
            <span
              className="text-[clamp(1.25rem,4.8vw,4.8rem)] font-black uppercase tracking-tight leading-none font-['Syne'] text-[#C8705D] select-none whitespace-nowrap inline-block"
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
        <div className="w-[75px] sm:w-[130px] md:w-[170px] lg:w-[200px] shrink-0 pointer-events-none" />

        {/* Right: KUMAR slides in from RIGHT to LEFT */}
        <div className="flex-1 text-left pl-1 sm:pl-4 overflow-visible">
          <div
            className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-28 sm:translate-x-44'
            }`}
          >
            <span
              className="text-[clamp(1.25rem,4.8vw,4.8rem)] font-black uppercase tracking-tight leading-none font-['Syne'] text-[#18181B] select-none whitespace-nowrap inline-block"
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

      {/* Center Cutout Portrait (Pravin in Floral Shirt) SLIDES IN FROM DOWN TO UP */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center items-end h-[50vh] sm:h-[65vh] md:h-[74vh] max-h-[740px] transition-transform duration-200 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.25}px), ${mouseOffset.y * 0.12}px) rotateY(${mouseOffset.x * -0.2}deg) translateZ(30px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className={`h-full w-auto transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-36 sm:translate-y-52 scale-95'
          }`}
        >
          <img
            src="./photos/hero_pravin.png"
            alt="Pravin Kumar"
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.28)]"
          />
        </div>
      </div>

      {/* Bottom Content Row */}
      <div className={`relative z-30 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-4 transition-all duration-1000 delay-200 ${
        animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Left Info Column */}
        <div className="max-w-xs sm:max-w-sm space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight font-['Space_Grotesk']">
            Python Developer
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
            Engineering digital systems that are fast, scalable, and performance-focused.
          </p>
          <div className="pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18181B] text-[#F3F4F6] text-xs font-bold uppercase tracking-wider hover:bg-[#333338] hover:scale-105 transition-all shadow-lg shadow-black/15 group"
            >
              <span>Let's collaborate</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Social Column from Reference */}
        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 text-xs font-medium text-[#4A4540]">
          <a
            href="https://github.com/pravinkumar-05"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group"
          >
            <Github size={14} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/pravinkumar"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group"
          >
            <Linkedin size={14} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group"
          >
            <Instagram size={14} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 hover:text-[#18181B] hover:translate-x-1 transition-all group"
          >
            <Globe size={14} className="text-[#8C827A] group-hover:text-[#18181B]" />
            <span className="hidden sm:inline">Twitter / X</span>
          </a>
        </div>
      </div>
    </section>
  )
}
