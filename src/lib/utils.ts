import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_URL = 'https://phonekainy.vercel.app'
export const SITE_DESCRIPTION = 'Discover BSMA’s moonlit paintings and turn your favourite artwork into a custom iPhone case. Explore the gallery, personalise your design, and carry a little art.'

export function constructMetadata({
  title = 'BSMA Case | Art to carry, worlds to keep',
  description = SITE_DESCRIPTION,
  image = '/opengraph-image',
  icons = '/icon.svg',
  path = '/',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  path?: string
} = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title, description,
    alternates: { canonical: path },
    applicationName: 'BSMA Case',
    openGraph: { title, description, url: path, siteName: 'BSMA Case', type: 'website', locale: 'en_US', images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    icons,
  }
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)
}

 