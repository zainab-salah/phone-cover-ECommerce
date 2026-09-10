'use server'
import sharp from 'sharp'
import { ARTWORKS } from '@/config/artworks'
import { getAuthSession } from '@/auth'
import { db } from '@/db'

export async function chooseArtwork(artworkId: string) {
  const artwork = ARTWORKS.find(art => art.id === artworkId)
  if (!artwork) throw new Error('Artwork not found')
  const userId = (await getAuthSession())?.user?.id
  if (userId) {
    const existing = await db.configuration.findFirst({ where: { userId, imageUrl: artwork.src, orders: { none: { isPaid: true } } }, orderBy: { updatedAt: 'desc' } })
    if (existing) return existing.id
  }
  const response = await fetch(artwork.src, { signal: AbortSignal.timeout(15000) })
  if (!response.ok) throw new Error('Artwork unavailable')
  const { width, height } = await sharp(Buffer.from(await response.arrayBuffer())).metadata()
  if (!width || !height) throw new Error('Invalid artwork')
  const configuration = await db.configuration.create({ data: { imageUrl: artwork.src, width, height, userId } })
  return configuration.id
}
