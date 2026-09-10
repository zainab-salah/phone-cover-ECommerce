'use client'

// Adapted from the Round Carousel by Originkit supplied for this project.
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'

type CarouselArtwork = { src: string; title: string; href: string }

export default function RoundCarousel({ images }: { images: CarouselArtwork[] }) {
  const ringRef = useRef<HTMLDivElement>(null)
  const rotation = useRef(0)
  const velocity = useRef(0)
  const drag = useRef({ active: false, x: 0 })
  const hovered = useRef(false)
  const [width, setWidth] = useState(210)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const angle = 360 / images.length
  const radius = (width * 1.65) / (2 * Math.tan(Math.PI / images.length))

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    if (ringRef.current) observer.observe(ringRef.current)
    return () => { media.removeEventListener('change', update); observer.disconnect() }
  }, [])

  useEffect(() => {
    const ring = ringRef.current
    if (!ring || reducedMotion) return
    let frame = 0
    let previous = 0
    const draw = (now: number) => {
      const elapsed = previous ? Math.min((now - previous) / 1000, 0.1) : 0
      previous = now
      if (!drag.current.active && !paused && !hovered.current && !document.hidden) {
        rotation.current += (Math.abs(velocity.current) > 0.1 ? velocity.current : 8) * elapsed
        velocity.current *= Math.pow(0.94, elapsed * 60)
      }
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotation.current}deg)`
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [radius, paused, reducedMotion])

  function step(direction: number) {
    setPaused(true)
    velocity.current = 0
    rotation.current += direction * angle
  }

  return <section className='case-carousel' aria-label='Painted phone cases'>
    <div
      className='case-carousel-stage'
      aria-hidden='true'
      onPointerEnter={() => { hovered.current = true }}
      onPointerLeave={() => { hovered.current = false }}
      onPointerDown={event => {
        if (event.button !== 0) return
        event.currentTarget.setPointerCapture(event.pointerId)
        drag.current = { active: true, x: event.clientX }
        velocity.current = 0
      }}
      onPointerMove={event => {
        if (!drag.current.active) return
        const delta = event.clientX - drag.current.x
        drag.current.x = event.clientX
        rotation.current += delta * 0.35
        velocity.current = delta * 20
      }}
      onPointerUp={event => {
        drag.current.active = false
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={() => { drag.current.active = false; velocity.current = 0 }}
      onLostPointerCapture={() => { drag.current.active = false }}
    >
      <div className='case-carousel-tilt'>
        <div ref={ringRef} className='case-carousel-ring' style={{ transform: `translateZ(${-radius}px)` }}>
          {images.map((image, index) => <div className='case-carousel-item' key={image.href} style={{ transform: `rotateY(${index * angle}deg) translateZ(${radius}px)` }}>
            <div className='case-carousel-face'><Phone imgSrc={image.src} dark /></div>
            <div className='case-carousel-face case-carousel-back'><Phone imgSrc={image.src} dark /></div>
          </div>)}
        </div>
      </div>
    </div>
    <div className='case-carousel-controls'>
      <Button variant='outline' size='icon' aria-label='Rotate cases left' onClick={() => step(1)}><ArrowLeft size={17} /></Button>
      <Button variant='outline' aria-label={paused ? 'Play carousel' : 'Pause carousel'} onClick={() => setPaused(!paused)}>
        {paused ? <Play size={14} className='mr-2' /> : <Pause size={14} className='mr-2' />}{paused ? 'Play' : 'Pause'}
      </Button>
      <Button variant='outline' size='icon' aria-label='Rotate cases right' onClick={() => step(-1)}><ArrowRight size={17} /></Button>
    </div>
    <p className='case-carousel-hint'>Drag to explore. Choose a painting below.</p>
    <div className='case-carousel-links home-container'>
      {images.map(image => <Link href={image.href} key={image.href}>
        <span className='case-carousel-static-phone'><Phone imgSrc={image.src} dark /></span>
        {image.title}
      </Link>)}
    </div>
  </section>
}
