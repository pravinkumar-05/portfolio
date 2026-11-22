import React, { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-14 py-4 flex items-center justify-between backdrop-blur-md bg-[#EDE7DF]/85 border-b border-[#18181B]/5 transition-all text-[#18181B]">
      {/* Left: Available status indicator from reference */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#4A4540]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Available for New Project</span>
      </div>

      {/* Center Nav from reference */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#5C554F]">
        <a href="#projects" className="hover:text-[#18181B] transition-colors">Work[3]</a>
        <a href="#services" className="hover:text-[#18181B] transition-colors">Service[4]</a>
        <a href="#architecture" className="hover:text-[#18181B] transition-colors">Experience</a>
        <a href="#contact" className="hover:text-[#18181B] transition-colors">Contact</a>
      </nav>

      {/* Right Action Button from reference */}
      <div className="hidden md:flex items-center">
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-[#18181B] text-[#F3F4F6] text-xs font-bold uppercase tracking-wider hover:bg-[#333338] hover:scale-105 transition-all shadow-md flex items-center gap-1 group"
        >
          <span>Let's Talk</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-[#18181B] p-2 rounded-lg bg-black/5"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#EDE7DF]/98 border-b border-[#18181B]/10 backdrop-blur-2xl p-6 flex flex-col gap-4 md:hidden shadow-xl animate-fadeIn">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#18181B] py-1 border-b border-black/5"
          >
            Work[3]
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#18181B] py-1 border-b border-black/5"
          >
            Service[4]
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#18181B] py-1 border-b border-black/5"
          >
            Experience
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-semibold text-[#18181B] py-1 border-b border-black/5"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-full bg-[#18181B] text-[#F3F4F6] font-bold text-xs uppercase tracking-wider mt-2"
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  )
}
