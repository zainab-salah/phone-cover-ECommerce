import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard', '/configure/', '/login', '/register', '/forgot-password', '/reset-password', '/thank-you'] }, sitemap: `${SITE_URL}/sitemap.xml` }
}
