import { constructMetadata } from '@/lib/utils'
import Gallery from '@/components/art/Gallery'
import Moon from '@/components/art/Moon'
export const metadata = constructMetadata({ title: 'The Gallery | BSMA Case', description: 'Explore 59 artworks from BSMA’s portfolio, from moonlit portraits to pomegranate dreams. Discover each painting and make a favourite into a phone case.', path: '/gallery' })
export default function Page() {
  return <div className='art-container gallery-page'><header className='gallery-heading'><div><p className='eyebrow'>Paintings by BSMA</p><h1>Her paintings.</h1><p>Browse the collection. Open a painting to see it up close or make it into a case.</p></div><Moon className='gallery-moon' /></header><Gallery /></div>
}
