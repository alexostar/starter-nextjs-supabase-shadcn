import { createClient } from '@/supabase/clients/server'

import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { redirect } from 'next/navigation'

// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default async function DropDown() {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <UserRound className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as</DropdownMenuLabel>
        <DropdownMenuItem>
          <p>{user?.email}</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/tasks'>My tasks</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={signOut}>
            <button className='rounded-md bg-orange-600 px-4 py-2 text-sm text-white no-underline hover:bg-orange-700'>
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
