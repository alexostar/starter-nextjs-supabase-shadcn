import AuthMessage from './_components/AuthMessage'

import { createClient } from '@/supabase/clients/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  return (
    <div className='flex w-full flex-1 flex-col items-center'>
      <AuthMessage />
      <div>The content of the Protected Page</div>
    </div>
  )
}
