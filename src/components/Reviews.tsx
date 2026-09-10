import { ARTWORKS, artworkImage } from '@/config/artworks'
import RoundCarousel from './art/RoundCarousel'

const caseArtworkIds = ['pomegranate-girl', 'full-moon', 'pomegranate-night', 'violet-lilies', 'blue-night', 'when-the-moon-falls']
export function Reviews() {
  return <RoundCarousel images={caseArtworkIds.map(id => {
      const artwork = ARTWORKS.find(art => art.id === id)!
      return { href: `/gallery/${id}`, src: artworkImage(artwork, 512), title: artwork.title }
    })} />
}
