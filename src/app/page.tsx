import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Phone from '@/components/Phone'
import { Reviews } from '@/components/Reviews'
import { buttonVariants } from '@/components/ui/button'
import { artworkImage, featuredArtworks } from '@/config/artworks'
import HeroPainting from '@/components/art/HeroPainting'

export default function Home() {
  return <div className='bsma-home'>
    <section className='home-hero'>
      <img className='painted-decoration hero-pomegranates' src='/pomegranate1.png' alt='' aria-hidden='true' />
      <div className='home-container hero-layout'>
        <div className='home-intro'>
          <h1>Her art.<br />Your favourite case.</h1>
          <p>A painting you love, made part of your everyday. Choose from BSMA’s collection or use your own image to create a case that feels like yours.</p>
          <div className='home-actions'><Link href='/gallery' className={buttonVariants({ size: 'lg' })}>Choose a painting <ArrowRight size={17} /></Link><Link href='/configure/upload' className={buttonVariants({ size: 'lg', variant: 'outline' })}>Use your own image</Link></div>
        </div>
        <div className='original-case-display'>
          <img className='original-moon' src='/moonstar.png' alt='' aria-hidden='true' />
          <HeroPainting />
          <img className='original-stars' src='/twostarts.png' alt='' aria-hidden='true' />
          <img className='painted-decoration phone-pomegranates' src='/pomegranate.png' alt='' aria-hidden='true' />
        </div>
      </div>
    </section>
    <section id='the-cases' className='home-cases'>
      <img className='painted-decoration cases-pomegranates' src='/pomegranatestar.png' alt='' aria-hidden='true' />
      <div className='home-container home-heading'><img className='heading-star' src='/onestar.png' alt='' aria-hidden='true' /><h2>Made for your pocket.</h2><p>Moonlit faces, pomegranates, and little painted stories.<br />Find the one you want to keep close.</p></div>
      <Reviews />
      <div className='home-actions justify-center'><Link href='/gallery' className={buttonVariants({ size: 'lg' })}>See all paintings <ArrowRight size={17} /></Link></div>
    </section>
    <section id='the-studio' className='home-painting-section'>
      <img className='painted-decoration painting-pomegranates' src='/pomegranate1.png' alt='' aria-hidden='true' />
      <div className='home-container'>
        <div className='home-heading'><img src='/moonstar.png' className='heading-moon' alt='' aria-hidden='true' /><h2>From her canvas to your case.</h2><p>Explore the paintings and the words that accompany them.<br />Choose a piece, then make it your own.</p></div>
        <div className='painting-to-case'><img className='full-painting' src={artworkImage(featuredArtworks[1])} alt='Full Moon painting by BSMA' loading='lazy' /><img className='painted-arrow' src='/arrow.png' alt='' aria-hidden='true' /><Phone className='painting-case' imgSrc={artworkImage(featuredArtworks[1])} dark /></div>
        <div className='home-actions justify-center'><Link href='/gallery' className={buttonVariants({ size: 'lg' })}>Explore her art <ArrowRight size={17} /></Link></div>
      </div>
    </section>
  </div>
}
