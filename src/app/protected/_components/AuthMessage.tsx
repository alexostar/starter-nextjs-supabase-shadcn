import { createClient } from '@/supabase/clients/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthMessage() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className='border-b-0 border-t-8 border-orange-600 bg-background py-4 text-sm text-slate-700'>
      <div className='mx-auto flex max-w-[100rem] justify-between px-8'>
        <h3 className=''>Logged in as {user.email}!</h3>
        <form action={signOut}>
          <button className='rounded-md bg-orange-600 px-4 py-2 text-sm text-white no-underline hover:bg-orange-700'>
            Logout
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Link
      href='/login'
      className='bg-btn-background hover:bg-btn-background-hover flex rounded-md px-3 py-2 no-underline'
    >
      Login
    </Link>
  )
}
