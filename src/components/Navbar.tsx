import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getAuthSession } from '@/auth'
import BrandLogo from './BrandLogo'

export default async function Navbar() {
  const user = (await getAuthSession())?.user
  const isAdmin = Boolean(user?.email && user.email === process.env.ADMIN_EMAIL)
  return <header className='art-header'><div className='art-container nav-inner'>
    <Link href='/' className='art-wordmark' aria-label='BSMA art — home'><BrandLogo /></Link>
    <nav className='main-nav' aria-label='Main navigation'><Link href='/gallery'>The gallery</Link><Link href='/#the-cases'>The cases</Link><Link href='/#the-studio'>The studio</Link></nav>
    <div className='account-nav'>{user ? <><Link href='/dashboard'>{isAdmin ? 'Dashboard' : 'My cases'}</Link><Link href='/api/auth/signout' className='signout-link'>Sign out</Link></> : <Link href='/login'>Sign in</Link>}<Link className='nav-create' href='/configure/upload'>Create a case <ArrowUpRight size={16} /></Link></div>
  </div></header>
}
