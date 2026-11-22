import React, { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from 'lucide-react'

export const pravinRealProjects = [
  {
    id: 1,
    title: 'ROADGUARD MAHARASHTRA',
    category: 'CIVIC AI / GEOSPATIAL INFRASTRUCTURE',
    desc: 'Real-time pothole detection & road safety reporting telemetry engineered for municipal infrastructure with geolocation telemetry and automated dispatch notifications.',
    image: './photos/real_pothole_dashboard.png',
    github: 'https://github.com/pravinkumar-05/pothole-reporter',
  },
  {
    id: 2,
    title: 'STOCK TRADING PLATFORM',
    category: 'HIGH-FREQUENCY FINTECH TERMINAL',
    desc: 'Full-stack trading terminal with live candlestick charting, real-time market data streaming via WebSockets, order book simulation, and portfolio analytics.',
    image: './photos/real_stock_platform.png',
    github: 'https://github.com/pravinkumar-05/stock-trading-platform',
  },
  {
    id: 3,
    title: 'JHAREXPLORE',
    category: 'CULTURAL HERITAGE & GIS PLATFORM',
    desc: 'Cultural and eco-tourism discovery platform for Jharkhand, showcasing immersive destination guides, interactive GIS trail maps, and regional artisan highlights.',
    image: './photos/real_jhar_betla.png',
    github: 'https://github.com/pravinkumar-05/JharExplore',
  },
]

export default function CurvedRibbonCarousel() {
  const [activeIdx, setActiveIdx] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleStart = (clientX) => {
    isDragging.current = true
    startX.current = clientX
  }

  const handleEnd = (clientX) => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = clientX - startX.current
    if (diff > 50) {
      setActiveIdx((prev) => Math.max(0, prev - 1))
    } else if (diff < -50) {
      setActiveIdx((prev) => Math.min(pravinRealProjects.length - 1, prev + 1))
    }
  }

  const activeProject = pravinRealProjects[activeIdx]

  return (
    <section className="py-24 bg-[#222222] text-white relative overflow-hidden select-none border-t border-b border-white/10">
      {/* Top Header from Video 2 (00:12) */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[#22D3EE] font-mono">
          Featured Projects // Live Repositories
        </h2>
        <span className="text-xs font-mono text-gray-400">
          [ 0{activeIdx + 1} / 0{pravinRealProjects.length} ]
        </span>
      </div>

      {/* 3D Curved Ribbon Stage (Video 2 at 00:13 - 00:16) */}
      <div
        className="relative w-full max-w-6xl mx-auto h-[380px] sm:h-[460px] flex items-center justify-center perspective-[1400px] cursor-grab active:cursor-grabbing px-2 sm:px-4"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => handleEnd(e.clientX)}
        onTouchStart={(e) => e.touches?.[0] && handleStart(e.touches[0].clientX)}
        onTouchEnd={(e) => e.changedTouches?.[0] && handleEnd(e.changedTouches[0].clientX)}
      >
        {pravinRealProjects.map((item, idx) => {
          const diff = idx - activeIdx
          let rotateY = diff * (isMobile ? -20 : -28)
          let translateX = diff * (isMobile ? 220 : 340)
          let translateZ = Math.abs(diff) * (isMobile ? -80 : -120)
          let scale = diff === 0 ? 1 : (isMobile ? 0.86 : 0.82)
          let opacity = diff === 0 ? 1 : (isMobile ? 0.5 : 0.65)

          return (
            <div
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className="absolute w-[88vw] sm:w-full sm:max-w-[540px] transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#2A2A2A] cursor-pointer group"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: 30 - Math.abs(diff) * 10,
              }}
            >
              {/* Browser mockup header */}
              <div className="h-8 sm:h-9 bg-[#1C1C1C] px-3 sm:px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 truncate max-w-[200px] sm:max-w-[240px]">
                  github.com/pravinkumar-05/{item.title.toLowerCase().replace(/ /g, '-')}
                </span>
                <div className="w-2 h-2" />
              </div>

              {/* Real Screenshot from Repo */}
              <div className="w-full h-52 sm:h-72 overflow-hidden relative bg-black/60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A] via-transparent to-transparent opacity-80" />
              </div>

              {/* Bottom Card Strip */}
              <div className="p-4 bg-[#2A2A2A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#22D3EE] uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white tracking-wide font-['Space_Grotesk']">
                    {item.title}
                  </h4>
                </div>
                <a
                  href={item.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full bg-white/10 hover:bg-[#C8705D] text-gray-300 hover:text-white transition-all shadow"
                  aria-label="View on GitHub"
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Project Details */}
      <div className="max-w-2xl mx-auto text-center mt-6 px-6">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#22D3EE] block mb-1">
          {activeProject.category}
        </span>
        <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-2">
          {activeProject.title}
        </h3>
        <p className="text-sm text-gray-300 mb-6">
          {activeProject.desc}
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href={activeProject.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C8705D] to-[#22D3EE] text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            <Github size={14} />
            <span>Open GitHub Repository</span>
          </a>
        </div>
      </div>

      {/* Bottom Category Label from Video 2 (00:16) */}
      <div className="max-w-6xl mx-auto px-6 mt-12 flex items-center justify-between text-xs font-mono text-gray-400">
        <span className="tracking-[0.25em] uppercase text-gray-300">
          Landing Pages // Systems
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
            disabled={activeIdx === 0}
            className="p-2 rounded-full border border-white/20 hover:border-white/50 disabled:opacity-30 transition-all text-white"
            aria-label="Previous card"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setActiveIdx((prev) => Math.min(pravinRealProjects.length - 1, prev + 1))}
            disabled={activeIdx === pravinRealProjects.length - 1}
            className="p-2 rounded-full border border-white/20 hover:border-white/50 disabled:opacity-30 transition-all text-white"
            aria-label="Next card"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
