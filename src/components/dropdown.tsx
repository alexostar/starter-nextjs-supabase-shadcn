import { createClient } from '@/supabase/clients/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
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

  const signOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <Avatar>
          <AvatarImage
            className='h-8 w-8 rounded-full'
            src='https://avatars.githubusercontent.com/u/81553309?v=4'
            alt='Sigfús'
          />
          <AvatarFallback className='text-black'>BT</AvatarFallback>
        </Avatar>
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
