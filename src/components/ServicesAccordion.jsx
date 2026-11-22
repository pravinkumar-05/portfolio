import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const services = [
  {
    id: '01',
    title: 'LANDING PAGE & PRODUCT EXPERIENCES',
    details: 'Immersive 3D and WebGL interfaces designed to captivate users and elevate brand conversion through scroll storytelling and fluid physical interactions.',
    tags: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL Shaders'],
  },
  {
    id: '02',
    title: 'FULL-STACK CLOUD ARCHITECTURE',
    details: 'End-to-end distributed system engineering with microservices, scalable API gateways, container orchestration, and continuous deployment pipelines.',
    tags: ['Node.js', 'TypeScript', 'Kubernetes', 'PostgreSQL', 'AWS'],
  },
  {
    id: '03',
    title: 'CREATIVE DIRECTION & INTERACTIVE 3D',
    details: 'Spatial web experiences, bespoke 3D object modeling, particle simulations, dynamic lighting, and customized visual identity.',
    tags: ['Blender', 'GLTF Optimization', 'Physics Engines', 'Motion Design'],
  },
  {
    id: '04',
    title: 'HIGH PERFORMANCE & SPEED OPTIMIZATION',
    details: 'Profiling GPU draw calls, texture compression (KTX2/Basis), sub-millisecond edge caching, and 100/100 Core Web Vitals compliance.',
    tags: ['Web Workers', 'DRACO Compression', 'CDN Edge', 'Profiling'],
  },
]

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState('01')

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-20 px-6">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#22D3EE] font-mono">
          Expertise & Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-2 font-['Space_Grotesk']">
          THE SERVICES WE PROVIDE
        </h2>
      </div>

      <div className="divide-y divide-white/10 border-t border-b border-white/10">
        {services.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="py-6 group">
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-mono text-gray-400 font-bold">{item.id}</span>
                  <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 group-hover:border-[#C8705D] group-hover:text-[#C8705D] transition-all">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              {isOpen && (
                <div className="mt-4 pl-12 text-gray-300 text-sm leading-relaxed animate-fadeIn">
                  <p className="max-w-2xl mb-4">{item.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#22D3EE]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
