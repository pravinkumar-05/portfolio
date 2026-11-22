import React, { useEffect, useState } from 'react'

const LETTERS = [
  { char: 'P', id: 0 },
  { char: 'R', id: 1 },
  { char: 'A', id: 2 },
  { char: 'V', id: 3 },
  { char: 'I', id: 4 },
  { char: 'N', id: 5 },
  { char: 'K', id: 6, isSpaceBefore: true },
  { char: 'U', id: 7 },
  { char: 'M', id: 8 },
  { char: 'A', id: 9 },
  { char: 'R', id: 10 },
  { char: "'", id: 11 },
  { char: 'S', id: 12 },
]

const PORTFOLIO_LETTERS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O']

export default function Preloader({ onComplete }) {
  const [droppedIndex, setDroppedIndex] = useState(-1)
  const [allDropped, setAllDropped] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [portfolioCharIndex, setPortfolioCharIndex] = useState(-1)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timeouts = []

    // 1. Drop PRAVINKUMAR'S letters one by one from top to center
    const startLettersDropTime = 250
    LETTERS.forEach((_, idx) => {
      timeouts.push(
        setTimeout(() => {
          setDroppedIndex(idx)
        }, startLettersDropTime + idx * 160)
      )
    })

    // 2. All letters finished dropping into PRAVINKUMAR'S
    const finishDropTime = startLettersDropTime + LETTERS.length * 160 + 350
    timeouts.push(
      setTimeout(() => {
        setAllDropped(true)
      }, finishDropTime)
    )

    // 3. Switch to PORTFOLIO (typing one by one in place, with slower deliberate pacing)
    const switchTime = finishDropTime + 1100
    timeouts.push(
      setTimeout(() => {
        setShowPortfolio(true)
      }, switchTime)
    )

    // Reveal PORTFOLIO letters one by one at deliberate speed (165ms per letter)
    PORTFOLIO_LETTERS.forEach((_, idx) => {
      timeouts.push(
        setTimeout(() => {
          setPortfolioCharIndex(idx)
        }, switchTime + 200 + idx * 165)
      )
    })

    // 4. Hold the assembled PORTFOLIO + Python Developer on screen
    const totalPortfolioTime = switchTime + 200 + PORTFOLIO_LETTERS.length * 165 + 1600
    timeouts.push(
      setTimeout(() => {
        setFading(true)
      }, totalPortfolioTime)
    )

    // 5. Complete loading and transition into website
    timeouts.push(
      setTimeout(() => {
        onComplete && onComplete()
      }, totalPortfolioTime + 700)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [onComplete])

  const handleSkip = () => {
    setFading(true)
    setTimeout(() => onComplete && onComplete(), 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#18181A] text-white transition-all duration-700 select-none overflow-hidden ${fading ? 'opacity-0 -translate-y-10 scale-105 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Skip button in top right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-10 text-[10px] uppercase font-mono tracking-[0.25em] text-gray-500 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200"
      >
        SKIP
      </button>

      {/* Stage 1: Dropping letters one by one from top to center in pure white (PRAVINKUMAR'S) */}
      <div
        className={`w-full max-w-[96vw] sm:max-w-[92vw] mx-auto flex items-center justify-center px-1 sm:px-4 overflow-visible transition-all duration-500 ease-out ${showPortfolio ? 'opacity-0 -translate-y-6 scale-95 pointer-events-none absolute' : 'opacity-100 translate-y-0 scale-100 relative'
          }`}
      >
        {LETTERS.map((item, idx) => {
          const isDropped = idx <= droppedIndex
          return (
            <span
              key={item.id}
              className={`inline-block font-black uppercase font-['Syne'] text-[clamp(1.1rem,4.4vw,4.2rem)] leading-none text-white transition-all duration-1000 ${item.isSpaceBefore ? 'ml-1 sm:ml-3 md:ml-6' : ''
                }`}
              style={{
                transform: isDropped
                  ? 'translateY(0px) scale(1) rotate(0deg)'
                  : 'translateY(-140vh) scale(1.35) rotate(-6deg)',
                opacity: isDropped ? 1 : 0,
                filter: isDropped ? 'blur(0px)' : 'blur(14px)',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                textShadow: allDropped
                  ? `
                    1px 1px 0px #4a4a4a,
                    2px 2px 0px #3a3a3a,
                    3px 3px 0px #2c2c2c,
                    4px 4px 0px #202020,
                    5px 5px 0px #141414,
                    8px 16px 36px rgba(0, 0, 0, 0.9)
                  `
                  : `
                    1px 1px 0px #383838,
                    2px 2px 0px #242424,
                    4px 8px 18px rgba(0, 0, 0, 0.6)
                  `,
                color: '#FFFFFF',
              }}
            >
              {item.char}
            </span>
          )
        })}
      </div>

      {/* Stage 2: Perfectly Centered "PORTFOLIO" (letter-by-letter in-place without dropping) + "Python Developer" at bottom right corner */}
      <div
        className={`w-full max-w-[92vw] mx-auto flex flex-col items-center justify-center transition-all duration-600 ease-out ${showPortfolio ? 'opacity-100 translate-y-0 scale-100 relative' : 'opacity-0 translate-y-6 scale-95 pointer-events-none absolute'
          }`}
      >
        <div className="relative inline-flex flex-col items-center max-w-full">
          {/* Letters container: appears one by one without dropping (deliberate slower reveal) */}
          <div className="flex items-center justify-center overflow-visible">
            {PORTFOLIO_LETTERS.map((char, idx) => {
              const isShown = idx <= portfolioCharIndex
              return (
                <span
                  key={idx}
                  className="inline-block font-black uppercase font-['Syne'] text-[clamp(1.7rem,6.2vw,4.8rem)] leading-none text-white tracking-tight transition-all duration-500 ease-out"
                  style={{
                    opacity: isShown ? 1 : 0,
                    transform: isShown ? 'scale(1)' : 'scale(0.85)',
                    filter: isShown ? 'blur(0px)' : 'blur(8px)',
                    textShadow: `
                      1px 1px 0px #4a4a4a,
                      2px 2px 0px #3a3a3a,
                      3px 3px 0px #2c2c2c,
                      4px 4px 0px #202020,
                      5px 5px 0px #141414,
                      8px 16px 36px rgba(0, 0, 0, 0.9)
                    `,
                  }}
                >
                  {char}
                </span>
              )
            })}
          </div>

          {/* Below Portfolio text at right corner: Python Developer with larger font & blackish red color */}
          <div
            className={`w-full flex justify-end mt-2.5 sm:mt-3 pr-0.5 transition-all duration-500 ${portfolioCharIndex >= PORTFOLIO_LETTERS.length - 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
              }`}
          >
            <span
              className="text-[11px] sm:text-sm md:text-base font-mono tracking-[0.16em] sm:tracking-[0.22em] uppercase font-bold text-[#C23628] flex items-center gap-1.5 sm:gap-2"
              style={{
                textShadow: '0 0 10px rgba(194, 54, 40, 0.45)',
              }}
            >
              <span>Python Developer</span>
              <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-ping" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
