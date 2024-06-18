// import AuthMessage from './_components/AuthMessage'

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
    <div className='flex justify-center pt-32 '>
      <h1>The title of a protected page</h1>
    </div>
  )
}
