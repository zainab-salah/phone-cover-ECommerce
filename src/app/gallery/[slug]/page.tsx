import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { ARTWORKS, artworkImage, PORTFOLIO_URL } from '@/config/artworks'
import { constructMetadata } from '@/lib/utils'
import ArtPhone from '@/components/art/ArtPhone'
import { POEMS } from '@/config/poems'
import ChooseArtwork from '@/components/art/ChooseArtwork'

type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const art = ARTWORKS.find(a => a.id === slug)
  if (!art) return {}
  return constructMetadata({ title: `${art.title} | BSMA Case`, description: `Discover ${art.title} (${art.year}) by BSMA. ${art.medium}. View the artwork and create your own art phone case.`, image: artworkImage(art), path: `/gallery/${art.id}` })
}
export default async function Page({ params }: Props) {
  const { slug } = await params
  const art = ARTWORKS.find(a => a.id === slug)
  if (!art) notFound()
  const poem = POEMS[art.id]
  return <article className='art-container artwork-page'>
    <Link className='text-link' href='/gallery'><ArrowLeft size={16} /> Back to the gallery</Link>
    <div className='artwork-detail'><div className='artwork-original'><a href={art.src} target='_blank' rel='noreferrer' aria-label={`Open full-size ${art.title}`}><img src={artworkImage(art, 2048)} alt={art.title} fetchPriority='high' /></a></div>
      <div className='artwork-story'><p className='eyebrow'>BSMA / {art.year}</p><h1>{art.title}</h1><p className='art-medium'>{art.medium}</p>
        {poem ? <blockquote className='artwork-poem' dir='rtl' lang='ar'>{poem}</blockquote> : <p className='artwork-intro'>Take a closer look at the original piece. Discover its accompanying words in the artist’s portfolio.</p>}
        <a className='text-link' href={PORTFOLIO_URL} target='_blank' rel='noreferrer'>Artwork & words in the original portfolio <ArrowUpRight size={16} /></a>
        <div className='artwork-case'><ArtPhone artwork={art} /><div><p className='eyebrow'>From canvas to case</p><h2>Make it<br />your case.</h2><ChooseArtwork artworkId={art.id} /><p className='art-medium'>Choose your phone, colour, and finish next.</p></div></div>
      </div>
    </div>
  </article>
}
