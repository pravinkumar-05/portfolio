import React, { useState } from 'react'
import { Server, ShieldCheck, Cpu, Database, Cloud, ChevronRight, Activity } from 'lucide-react'

const architectureLayers = [
  {
    id: '01',
    name: 'CLIENT INTERFACES',
    badge: 'REACT 18 / THREE.JS / TAILWIND',
    desc: 'Ultra-low latency reactive frontend, WebGL hardware-accelerated shaders, and responsive UI layout.',
    metrics: '< 16ms frame time • 60 FPS',
    icon: Cpu,
    color: '#22D3EE',
  },
  {
    id: '02',
    name: 'API GATEWAY & LOAD BALANCER',
    badge: 'DISTRIBUTED REVERSE PROXY',
    desc: 'High-throughput edge routing, rate limiting, SSL termination, and dynamic HTTP/3 request pipelining.',
    metrics: '99.999% SLA • < 5ms edge routing',
    icon: ShieldCheck,
    color: '#7C5CFF',
  },
  {
    id: '03',
    name: 'LOGIC & MICROSERVICES CLUSTER',
    badge: 'NODE.JS / GO / DOCKER',
    desc: 'Event-driven microservices architecture processing real-time telemetry, transaction flows, and business logic.',
    metrics: '400K+ concurrent workers • Auto-scaling',
    icon: Server,
    color: '#22D3EE',
  },
  {
    id: '04',
    name: 'PERSISTENCE & CACHING LAYER',
    badge: 'POSTGRESQL / REDIS / CDC',
    desc: 'Multi-region distributed caching, ACID compliant transactional stores, and sub-millisecond query caches.',
    metrics: '0.8ms Redis latency • Real-time replication',
    icon: Database,
    color: '#7C5CFF',
  },
  {
    id: '05',
    name: 'CLOUD INFRASTRUCTURE',
    badge: 'AWS / KUBERNETES / CLOUDFRONT',
    desc: 'Terraform-managed multi-zone infrastructure with automated zero-downtime rolling deployments.',
    metrics: 'Global CDN • Automated Failover',
    icon: Cloud,
    color: '#22D3EE',
  },
]

export default function ArchitectureStack() {
  const [activeLayer, setActiveLayer] = useState(architectureLayers[0])

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-6">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C8705D] font-semibold">
          High-Scale Architecture
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-2 font-['Space_Grotesk']">
          ENGINEERED FOR SCALE
        </h2>
        <p className="text-gray-300 max-w-lg mx-auto text-sm mt-3">
          Interactive systems stack inspired by modern high-throughput digital infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Layer Selection Buttons (Stacked) */}
        <div className="lg:col-span-7 space-y-3">
          {architectureLayers.map((layer) => {
            const isSelected = activeLayer.id === layer.id
            const Icon = layer.icon
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#2E2E2E] border-[#22D3EE] shadow-lg shadow-[#22D3EE]/15 scale-[1.02]'
                    : 'bg-[#282828] border-white/10 hover:border-white/30 hover:bg-[#2E2E2E]/80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#22D3EE]/20 text-[#22D3EE]' : 'bg-white/10 text-gray-300 group-hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400 font-bold">{layer.id}</span>
                      <h3 className="font-bold text-sm tracking-wide text-white group-hover:text-[#22D3EE] transition-colors">
                        {layer.name}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-300 font-mono mt-0.5 block">{layer.badge}</span>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    isSelected ? 'translate-x-1 text-[#22D3EE]' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#2D2D2D] to-[#222222] border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#22D3EE]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-[#22D3EE] mb-6 font-mono">
            <Activity size={12} className="animate-pulse" />
            LAYER {activeLayer.id} SPECS
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">{activeLayer.name}</h3>
          <p className="text-sm font-mono text-[#C8705D] mb-4">{activeLayer.badge}</p>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {activeLayer.desc}
          </p>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">Performance SLA</span>
            <span className="text-sm font-semibold text-[#22D3EE] font-mono">{activeLayer.metrics}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
