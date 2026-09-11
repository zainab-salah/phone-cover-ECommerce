'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function CursorMoonlight() {
  const lightRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const light = lightRef.current
    if (!light) return
    const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let x = 0
    let y = 0

    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      light.removeAttribute('data-active')
    }
    const move = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType === 'touch') return
      x = event.clientX
      y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        light.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`
        light.setAttribute('data-active', '')
      })
    }
    const leave = (event: PointerEvent) => {
      if (event.relatedTarget === null) reset()
    }

    // Capture also works over dropdowns and dialogs that stop event propagation.
    document.addEventListener('pointermove', move, { passive: true, capture: true })
    document.addEventListener('pointerout', leave)
    document.addEventListener('pointercancel', reset)
    document.addEventListener('visibilitychange', reset)
    window.addEventListener('blur', reset)
    motion.addEventListener('change', reset)
    return () => {
      reset()
      document.removeEventListener('pointermove', move, true)
      document.removeEventListener('pointerout', leave)
      document.removeEventListener('pointercancel', reset)
      document.removeEventListener('visibilitychange', reset)
      window.removeEventListener('blur', reset)
      motion.removeEventListener('change', reset)
    }
  }, [pathname])

  return <div ref={lightRef} className='cursor-moonlight' aria-hidden='true' />
}
