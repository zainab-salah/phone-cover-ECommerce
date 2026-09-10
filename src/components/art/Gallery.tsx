'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ARTWORKS, artworkImage } from '@/config/artworks'
import Reveal from './Reveal'

const years = Array.from(new Set(ARTWORKS.map(art => art.year))).sort((a, b) => b - a)
export default function Gallery() {
  const [year, setYear] = useState<number | null>(null)
  const artworks = ARTWORKS.filter(art => year === null || art.year === year)
  return <>
    <div className='gallery-toolbar'><div role='group' aria-label='Filter artworks by year'><button aria-pressed={year === null} onClick={() => setYear(null)}>All works</button>{years.map(value => <button key={value} aria-pressed={year === value} onClick={() => setYear(value)}>{value}</button>)}</div><p aria-live='polite'>{artworks.length} pieces</p></div>
    <div className='gallery-grid'>{artworks.map((art, index) => <Reveal key={art.id} delay={(index % 3) * 0.06}><Link href={`/gallery/${art.id}`} className='selected-work'>
      <div className='gallery-image'><img src={artworkImage(art)} alt={art.title} loading='lazy' /><span className='image-arrow'><ArrowUpRight size={22} /></span></div>
      <div className='art-caption'><h2>{art.title}</h2><span>{art.year}</span></div><p className='art-medium'>{art.medium}</p>
    </Link></Reveal>)}</div>
  </>
}
