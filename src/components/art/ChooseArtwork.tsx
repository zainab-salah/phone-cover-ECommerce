'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { chooseArtwork } from '@/app/gallery/actions'
export default function ChooseArtwork({ artworkId }: { artworkId: string }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  async function choose() {
    setPending(true)
    setError('')
    try {
      const id = await chooseArtwork(artworkId)
      router.push(`/configure/design?id=${id}`)
    } catch {
      setError('We couldn’t start your design. Please try again.')
      setPending(false)
    }
  }
  return <><button className='gold-button' disabled={pending} onClick={choose}>{pending ? 'Preparing your canvas' : 'Make this my case'}{pending ? <Loader2 className='animate-spin' size={16} /> : <ArrowUpRight size={16} />}</button>{error ? <p role='alert' className='mt-3 text-sm text-red-300'>{error}</p> : null}</>
}
