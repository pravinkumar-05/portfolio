import React from 'react'
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-[#071A15] border-t border-emerald-500/10 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden text-[#F3F4F6]">
      {/* Background ambient emerald glow matching #071A15 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#22D3EE] font-mono mb-3 sm:mb-4 inline-block">
          Ready to engineer something impactful?
        </span>

        {/* Large bold callout title from Video 1 & Video 2 */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 sm:mb-8 font-['Space_Grotesk']">
          LET'S TALK.
        </h2>

        <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base md:text-lg mb-8 sm:mb-12 px-2">
          Let’s construct the extraordinary. Open for Python engineering roles, civic technology development, and creative 3D web collaborations.
        </p>

        {/* Interactive Magnetic Social Pills with emerald accent border */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-12 sm:mb-16">
          {[
            { name: 'GITHUB', href: 'https://github.com/pravinkumar-05', icon: Github },
            { name: 'EMAIL', href: 'mailto:contact@pravinkumar.dev', icon: Mail },
            { name: 'LINKEDIN', href: 'https://linkedin.com/in/pravinkumar', icon: Linkedin },
            { name: 'TWITTER', href: 'https://twitter.com', icon: Twitter },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#0E2721] border border-emerald-500/20 text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-2 hover:border-[#22D3EE] hover:bg-emerald-500/20 hover:scale-105 transition-all shadow-lg"
              >
                <Icon size={13} className="text-[#22D3EE] group-hover:rotate-12 transition-transform" />
                <span>{item.name}</span>
                <ArrowUpRight size={13} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
            )
          })}
        </div>

        <div className="border-t border-emerald-500/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-mono">
          <span>© 2026 PRAVIN KUMAR (@pravinkumar-05). ALL RIGHTS RESERVED.</span>
          <span className="mt-2 md:mt-0">POWERED BY REACT 18 • THREE.JS • TAILWIND</span>
        </div>
      </div>
    </footer>
  )
}
