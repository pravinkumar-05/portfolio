import React, { useEffect, useState } from 'react'

const statsData = [
  { value: 50, suffix: '+', label: 'COMPLETED PROJECTS' },
  { value: 99.9, suffix: '%', label: 'SYSTEM UPTIME' },
  { value: 400, suffix: 'K+', label: 'REQ / SEC CAPACITY' },
  { value: 15, suffix: '+', label: 'AWARDS & MENTIONS' },
]

function CounterItem({ stat }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = stat.value
    const duration = 1800
    const frameRate = 30
    const totalFrames = Math.round((duration / 1000) * frameRate)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const current = start + (end - start) * (1 - Math.pow(1 - progress, 3))
      
      if (frame >= totalFrames) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(stat.value % 1 !== 0 ? Number(current.toFixed(1)) : Math.round(current))
      }
    }, 1000 / frameRate)

    return () => clearInterval(timer)
  }, [stat.value])

  return (
    <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#2A2A2A] border border-white/10 backdrop-blur-md text-center hover:border-[#22D3EE]/40 transition-all group shadow-lg">
      <div className="text-2xl sm:text-4xl md:text-6xl font-black text-white font-['Space_Grotesk'] tracking-tight group-hover:text-[#22D3EE] transition-colors">
        {count}
        <span className="text-[#C8705D] text-xl sm:text-3xl md:text-5xl">{stat.suffix}</span>
      </div>
      <p className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-gray-400 mt-1.5 sm:mt-2 font-mono">
        {stat.label}
      </p>
    </div>
  )
}

export default function StatCounters() {
  return (
    <div className="w-full max-w-5xl mx-auto py-10 sm:py-16 px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {statsData.map((stat, i) => (
          <CounterItem key={i} stat={stat} />
        ))}
      </div>
    </div>
  )
}
