import Image from 'next/image'

const painting = {
  src: '/artworks/pomegranate-moon.png',
  width: 1653,
  height: 2048,
  sizes: '(max-width: 760px) 90vw, 440px',
}

export default function HeroPainting() {
  return <div className='hero-painting'>
    <Image {...painting} className='hero-painting-original' priority alt='Painting by BSMA of a woman with long black hair beneath pomegranates, a gold crescent moon, and stars on a deep blue sky' />
  </div>
}
