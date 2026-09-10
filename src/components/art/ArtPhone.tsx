import { Artwork, artworkImage } from '@/config/artworks'
import Phone from '@/components/Phone'
export default function ArtPhone({ artwork, className = '' }: { artwork: Artwork; className?: string }) {
  return <Phone imgSrc={artworkImage(artwork)} className={`art-phone ${className}`} dark aria-label={`${artwork.title} on a phone case`} />
}
