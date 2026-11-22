import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { pravinRealProjects } from './CurvedRibbonCarousel'

export default function WorksHexagonShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const currentProject = pravinRealProjects[activeIndex]

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % pravinRealProjects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + pravinRealProjects.length) % pravinRealProjects.length)
  }

  return (
    <section className="py-28 px-6 md:px-14 bg-[#EDE7DF] text-[#18181B] relative overflow-hidden select-none border-t border-b border-[#18181B]/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C8705D]/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C827A] font-mono">
          Featured Architecture // 02
        </span>
        <span className="text-xs font-mono text-[#5C554F]">
          [ WORKS '26 ROTATING SHOWCASE ]
        </span>
      </div>

      {/* Main 3-Column Layout from Video 2 (00:18 - 00:24) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
        
        {/* Left Column: Active Project Meta */}
        <div className="lg:col-span-3 space-y-4 z-20">
          <span className="text-xs font-mono text-[#C8705D] uppercase tracking-wider block font-bold">
            PROJECT 0{currentProject.id} / 0{pravinRealProjects.length}
          </span>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight font-['Space_Grotesk'] text-[#18181B] leading-tight transition-all duration-300">
            {currentProject.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
            {currentProject.desc}
          </p>
          <div className="pt-2">
            <a
              href={currentProject.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181B] text-[#F3F4F6] text-xs font-bold uppercase tracking-wider hover:bg-[#333338] hover:scale-105 transition-all shadow-md group"
            >
              <Github size={14} />
              <span>GitHub Repo</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Center Column: The Hexagonal 3D Revolving Showcase (as seen in video 2) */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-8 z-10">
          
          {/* Centered WORKS '26 Title in the Core of the Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none text-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#18181B]/15 uppercase font-['Space_Grotesk'] block">
              WORKS '26
            </span>
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#8C827A] uppercase block mt-1">
              [ REVOLVING SPATIAL ENGINE ]
            </span>
          </div>

          {/* 3D Revolving Card Stage */}
          <div
            className="w-full max-w-[92vw] sm:max-w-[500px] h-[300px] sm:h-[360px] relative perspective-[1200px] flex items-center justify-center cursor-pointer group"
            onClick={nextProject}
          >
            {pravinRealProjects.map((proj, idx) => {
              const offset = (idx - activeIndex + pravinRealProjects.length) % pravinRealProjects.length
              
              let transformStyle = ''
              let zIndex = 10
              let opacity = 0

              if (offset === 0) {
                // Active Card: Centered & Flat in Front
                transformStyle = `rotateX(0deg) translateZ(${isMobile ? 80 : 140}px) scale(1)`
                zIndex = 30
                opacity = 1
              } else if (offset === 1) {
                // Top Card: Angled up backwards in 3D perspective
                transformStyle = `rotateX(38deg) translateY(${isMobile ? -95 : -140}px) translateZ(-60px) scale(${isMobile ? 0.88 : 0.85})`
                zIndex = 15
                opacity = 0.75
              } else if (offset === 2) {
                // Bottom Card: Angled down backwards in 3D perspective
                transformStyle = `rotateX(-38deg) translateY(${isMobile ? 95 : 140}px) translateZ(-60px) scale(${isMobile ? 0.88 : 0.85})`
                zIndex = 15
                opacity = 0.75
              }

              return (
                <div
                  key={proj.id}
                  className="absolute w-[88vw] sm:w-full sm:max-w-[460px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#161B2E]"
                  style={{
                    transform: transformStyle,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-auto max-h-[260px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="font-bold">{proj.title}</span>
                    <span className="text-[#22D3EE]">{proj.category.split('/')[0]}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Navigation Scrubbers */}
          <div className="flex items-center gap-4 mt-6 z-20">
            <button
              onClick={prevProject}
              className="p-3 rounded-full bg-[#18181B] text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {pravinRealProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-[#18181B]' : 'w-2 bg-[#8C827A]/40'
                  }`}
                  aria-label={`Jump to project ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextProject}
              className="p-3 rounded-full bg-[#18181B] text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Column: Project Technical Specs */}
        <div className="lg:col-span-3 space-y-4 z-20 text-right lg:text-right">
          <div className="p-4 rounded-2xl bg-white/40 border border-black/5 shadow-sm inline-block text-left w-full">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
              SYSTEM ARCHITECTURE
            </span>
            <span className="text-xs font-bold text-[#18181B] font-mono block">
              Full-Stack System • Production Tested
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 border border-black/5 shadow-sm inline-block text-left w-full">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] block mb-1">
              REPOSITORY VERIFIED
            </span>
            <span className="text-xs font-bold text-[#C8705D] font-mono block">
              github.com/pravinkumar-05
            </span>
          </div>

          <p className="text-[11px] font-mono text-[#8C827A]">
            CLICK CARD OR SCRUBBER TO REVOLVE 3D WORKS
          </p>
        </div>

      </div>
    </section>
  )
}
