import type { MetadataRoute } from 'next'
import { ARTWORKS } from '@/config/artworks'
import { SITE_URL } from '@/lib/utils'
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/gallery', ...ARTWORKS.map(a => `/gallery/${a.id}`)].map(path => ({ url: `${SITE_URL}${path}` }))
}
