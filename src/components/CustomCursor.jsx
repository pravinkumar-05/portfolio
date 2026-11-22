import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const cursorTextRef = useRef(null)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let prevRingX = -100
    let prevRingY = -100
    let isHovering = false
    let isClicking = false
    let hoverText = ''
    let isVisible = false
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }

      // Detect hover targets
      const target = e.target
      const interactiveEl = target.closest('a, button, input, [role="button"], canvas, .cursor-pointer')
      if (interactiveEl) {
        isHovering = true
        hoverText = interactiveEl.getAttribute('data-cursor') || ''
      } else {
        isHovering = false
        hoverText = ''
      }
    }

    const onMouseDown = () => { isClicking = true }
    const onMouseUp = () => { isClicking = false }
    const onMouseLeave = () => {
      isVisible = false
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const onMouseEnter = () => {
      isVisible = true
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Butter-smooth 120 FPS animation loop with ZERO React re-renders
    const render = () => {
      // Lerp ring towards mouse with smooth spring physics
      const ease = 0.18
      ringX += (mouseX - ringX) * ease
      ringY += (mouseY - ringY) * ease

      // Calculate velocity for dynamic squash & stretch
      const vx = ringX - prevRingX
      const vy = ringY - prevRingY
      prevRingX = ringX
      prevRingY = ringY

      const speed = Math.sqrt(vx * vx + vy * vy)
      const angle = Math.atan2(vy, vx) * (180 / Math.PI)
      const stretch = Math.min(1 + speed * 0.015, 1.45)
      const squeeze = 1 / stretch

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.6 : isHovering ? 1.5 : 1
        })`
      }

      if (ringRef.current) {
        const baseScale = isClicking ? 0.8 : isHovering ? 1.7 : 1
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${
          baseScale * stretch
        }, ${baseScale * squeeze})`

        if (isHovering) {
          ringRef.current.style.borderColor = '#22D3EE'
          ringRef.current.style.backgroundColor = 'rgba(34, 211, 238, 0.12)'
        } else {
          ringRef.current.style.borderColor = 'rgba(200, 112, 93, 0.7)'
          ringRef.current.style.backgroundColor = 'transparent'
        }
      }

      if (cursorTextRef.current) {
        cursorTextRef.current.innerText = hoverText
        cursorTextRef.current.style.opacity = hoverText ? '1' : '0'
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Central precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#18181B] pointer-events-none z-[9999] opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />
      {/* Outer fluid elastic ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#C8705D]/80 pointer-events-none z-[9998] opacity-0 transition-colors duration-200 flex items-center justify-center backdrop-blur-[0.5px]"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={cursorTextRef}
          className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter opacity-0 transition-opacity pointer-events-none"
        />
      </div>
    </>
  )
}
