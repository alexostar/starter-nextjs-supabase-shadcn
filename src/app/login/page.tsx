import Link from 'next/link'
import { headers } from 'next/headers'
import { createClient } from '@/supabase/clients/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from './_components/SubmitButton'

export default function Login({
  searchParams
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/protected')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`
      }
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className='mx-auto mt-32 flex w-full flex-1 items-center justify-center px-8 sm:max-w-md'>
      <form className='flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in'>
        <label className='text-md' htmlFor='email'>
          Email
        </label>
        <input
          className='mb-6 rounded-md border bg-orange-100 px-4 py-2'
          name='email'
          placeholder='you@example.com'
          required
        />
        <label className='text-md' htmlFor='password'>
          Password
        </label>
        <input
          className='mb-6 rounded-md border bg-orange-100 px-4 py-2'
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />
        <SubmitButton
          formAction={signIn}
          className='mb-2 rounded-md bg-orange-400 px-4 py-2 text-foreground'
          pendingText='Signing In...'
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className='mb-2 rounded-md border border-orange-400 px-4 py-2 text-foreground'
          pendingText='Signing Up...'
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className='mt-4 bg-foreground/10 p-4 text-center text-foreground'>
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
