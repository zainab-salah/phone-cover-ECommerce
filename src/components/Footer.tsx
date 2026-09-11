import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PORTFOLIO_URL } from '@/config/artworks'
import BrandLogo from './BrandLogo'

export default function Footer() {
  return <footer className='art-footer'><div className='art-container'>
    <div className='footer-top'><Link href='/' className='art-wordmark' aria-label='BSMA art — home'><BrandLogo /></Link><p>Art by BSMA. A case made yours.</p><a href='https://www.instagram.com/bsmadnan/' target='_blank' rel='noreferrer'>Instagram <ArrowUpRight size={15} /></a></div>
    <div className='footer-bottom'><span>© {new Date().getFullYear()} BSMA Case</span><nav aria-label='Footer'><Link href='/gallery'>The gallery</Link><Link href='/configure/upload'>Create a case</Link><a href={PORTFOLIO_URL} target='_blank' rel='noreferrer'>Original portfolio ↗</a></nav><span></span></div>
  </div></footer>
}
