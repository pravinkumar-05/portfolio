import React, { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import HeroReference from './components/HeroReference'
import AboutZeroGravity from './components/AboutZeroGravity'
import CurvedRibbonCarousel from './components/CurvedRibbonCarousel'
import WorksHexagonShowcase from './components/WorksHexagonShowcase'
import ArchitectureStack from './components/ArchitectureStack'
import StatCounters from './components/StatCounters'
import ServicesAccordion from './components/ServicesAccordion'
import Footer from './components/Footer'
import { ArrowUp } from 'lucide-react'

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#222222] text-[#F3F4F6] selection:bg-[#C8705D] selection:text-white font-sans overflow-x-hidden relative">
      {/* Custom Trailing Glow Cursor */}
      <CustomCursor />

      {/* Intro Preloader */}
      {!loadingComplete && <Preloader onComplete={() => setLoadingComplete(true)} />}

      {/* Top Navbar */}
      <Navbar />

      {/* Back to top floating button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#18181B] border border-white/10 text-white hover:border-[#22D3EE] hover:text-[#22D3EE] shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* 1. Hero Section matching user's photo & reference screenshot */}
      <HeroReference isLoaded={loadingComplete} />

      {/* 2. ABOUT ME Section (From Video 2 at 00:04 - 00:06 with 3D Zero-G Floating Figure & Starry Night Backdrop) */}
      <AboutZeroGravity />

      {/* 3. Kinetic Typography Manifesto */}
      <section id="manifesto" className="py-24 px-6 md:px-16 max-w-6xl mx-auto border-t border-b border-white/10 bg-[#222222]">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8705D] block mb-6">
          // Design Philosophy
        </span>
        <blockquote className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight font-['Space_Grotesk']">
          "I DON'T JUST BUILD APPLICATIONS.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#7C5CFF]">
            I ENGINEER DIGITAL INFRASTRUCTURE.
          </span>{' '}
          WHERE HIGH-PERFORMANCE LOGIC MEETS ELEGANT INTERFACES."
        </blockquote>
      </section>

      {/* 4. Curved 3D Ribbon Project Carousel (Real Screenshots from Repo) */}
      <section id="projects">
        <CurvedRibbonCarousel />
      </section>

      {/* 5. Hexagonal 3D Revolving Showcase: WORKS '26 (Real Screenshots from Repo) */}
      <section>
        <WorksHexagonShowcase />
      </section>

      {/* 6. High-Scale Architecture Stack */}
      <section id="architecture">
        <ArchitectureStack />
      </section>

      {/* 7. Real-Time Animated Stats Counters */}
      <section>
        <StatCounters />
      </section>

      {/* 8. Expandable Services Accordion */}
      <section id="services">
        <ServicesAccordion />
      </section>

      {/* 9. Interactive Footer (#071A15) */}
      <section id="contact">
        <Footer />
      </section>
    </div>
  )
}
