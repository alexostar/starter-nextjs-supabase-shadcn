import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
//import { LogIn } from 'lucide-react'

export default function Header() {
  return (
    <header className='border-b-2 py-4'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-6 font-medium'>
          <li>
            <Link href='/' className='font-bold tracking-wider text-primary'>
              CASABRAVA
            </Link>
          </li>
          <li>
            <Link href='/about'>Company</Link>
          </li>
        </ul>
        <div className='flex items-center gap-8'>
          <Link href='/' className='text-primary'>
            Login
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
