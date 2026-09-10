'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const painting = {
  src: '/artworks/pomegranate-moon.png',
  width: 1653,
  height: 2048,
  sizes: '(max-width: 760px) 90vw, 440px',
}

export default function HeroPainting() {
  const paintingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = paintingRef.current
    if (!element) return
    const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let clientX = 0
    let clientY = 0

    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      element!.removeAttribute('data-illuminated')
    }

    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType === 'touch') return
      clientX = event.clientX
      clientY = event.clientY
      if (frame) return
      // At most one update per frame; React doesn't re-render while the mouse moves.
      frame = requestAnimationFrame(() => {
        frame = 0
        const bounds = element!.getBoundingClientRect()
        element!.style.setProperty('--reveal-x', `${clientX - bounds.left}px`)
        element!.style.setProperty('--reveal-y', `${clientY - bounds.top}px`)
        element!.setAttribute('data-illuminated', '')
      })
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('pointercancel', reset)
    motion.addEventListener('change', reset)
    window.addEventListener('blur', reset)
    return () => {
      reset()
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('pointercancel', reset)
      motion.removeEventListener('change', reset)
      window.removeEventListener('blur', reset)
    }
  }, [])

  return <div ref={paintingRef} className='hero-painting'>
    <Image {...painting} className='hero-painting-original' priority alt='Painting by BSMA of a woman with long black hair beneath pomegranates, a gold crescent moon, and stars on a deep blue sky' />
    <div className='hero-painting-light' aria-hidden='true'>
      <Image {...painting} alt='' className='hero-painting-colour' />
    </div>
    <div className='hero-painting-dither' aria-hidden='true' />
  </div>
}
