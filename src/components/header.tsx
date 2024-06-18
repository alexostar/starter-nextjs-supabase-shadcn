import { createClient } from '@/supabase/clients/server'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import DropDown from '@/components/dropdown'
//import { LogIn } from 'lucide-react'

export default async function Header() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

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
          {!user ? (
            <Link href='/' className='text-primary'>
              Login
            </Link>
          ) : (
            ''
          )}
          <ThemeToggle />
          {user ? <DropDown /> : ''}
        </div>
      </nav>
    </header>
  )
}
