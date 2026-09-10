'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const forgotPasswordSchema = z.object({ email: z.string().email('Enter a valid email address.') })
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' } })

  async function onSubmit(values: ForgotPasswordValues) {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const body = await response.json()

    if (!response.ok) {
      form.setError('root', { message: body.message ?? 'Could not start password reset.' })
      return
    }

    form.reset()
    form.setError('root', { type: 'success', message: 'If an account exists for that email, a reset link is on its way.' })
  }

  const rootError = form.formState.errors.root
  return (
    <main className='mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-md flex-col justify-center px-6 py-12 text-white'>
      <h1 className='text-3xl font-bold'>Reset your password</h1>
      <p className='mt-2 text-zinc-300'>Enter your email and we will send you a reset link.</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-4' noValidate>
        <label className='block'>
          <span className='text-sm'>Email</span>
          <input {...form.register('email')} type='email' className='mt-1 w-full rounded-md border border-zinc-500 bg-white px-3 py-2 text-black' />
          {form.formState.errors.email ? <p className='mt-1 text-sm text-red-300'>{form.formState.errors.email.message}</p> : null}
        </label>
        {rootError ? <p className={`text-sm ${rootError.type === 'success' ? 'text-green-300' : 'text-red-300'}`}>{rootError.message}</p> : null}
        <Button type='submit' isLoading={form.formState.isSubmitting} loadingText='Sending' className='w-full'>Send reset link</Button>
      </form>
      <Link href='/login' className='mt-6 text-sm font-semibold text-white underline'>Back to sign in</Link>
    </main>
  )
}
