'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  confirmPassword: z.string().min(8, 'Confirm your password.'),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function onSubmit(values: ResetPasswordValues) {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password: values.password }),
    })
    const body = await response.json()

    if (!response.ok) {
      form.setError('root', { message: body.message ?? 'Could not reset your password.' })
      return
    }

    router.push('/login')
  }

  return (
    <main className='mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-md flex-col justify-center px-6 py-12 text-white'>
      <h1 className='text-3xl font-bold'>Choose a new password</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-4' noValidate>
        <label className='block'>
          <span className='text-sm'>New password</span>
          <input {...form.register('password')} type='password' className='mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-foreground' />
          {form.formState.errors.password ? <p className='mt-1 text-sm text-red-300'>{form.formState.errors.password.message}</p> : null}
        </label>
        <label className='block'>
          <span className='text-sm'>Confirm password</span>
          <input {...form.register('confirmPassword')} type='password' className='mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-foreground' />
          {form.formState.errors.confirmPassword ? <p className='mt-1 text-sm text-red-300'>{form.formState.errors.confirmPassword.message}</p> : null}
        </label>
        {form.formState.errors.root ? <p className='text-sm text-red-300'>{form.formState.errors.root.message}</p> : null}
        <Button type='submit' isLoading={form.formState.isSubmitting} loadingText='Saving' className='w-full'>Save new password</Button>
      </form>
      <Link href='/login' className='mt-6 text-sm font-semibold text-white underline'>Back to sign in</Link>
    </main>
  )
}
