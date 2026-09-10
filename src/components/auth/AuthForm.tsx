'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const authSchema = z.object({
  name: z.string().trim().max(100),
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})
type AuthValues = z.infer<typeof authSchema>

type AuthFormProps = {
  mode: 'login' | 'register'
  callbackUrl: string
  googleEnabled: boolean
}

export default function AuthForm({ mode, callbackUrl, googleEnabled }: AuthFormProps) {
  const router = useRouter()
  const isRegistration = mode === 'register'
  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema.superRefine((values, context) => {
      if (isRegistration && !values.name) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['name'], message: 'Enter your name.' })
      }
    })),
    defaultValues: { name: '', email: '', password: '' },
  })

  async function onSubmit(values: AuthValues) {
    if (isRegistration) {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        const body = await response.json()
        form.setError('root', { message: body.message ?? 'Could not create your account.' })
        return
      }
    }

    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    })

    if (result?.error) {
      form.setError('root', { message: 'Email or password is incorrect.' })
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <main className='mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-md flex-col justify-center px-6 py-12 text-white'>
      <h1 className='text-3xl font-bold'>{isRegistration ? 'Create your account' : 'Welcome back'}</h1>
      <p className='mt-2 text-muted-foreground'>
        {isRegistration ? 'Save your designs and check out when you are ready.' : 'Sign in to continue your order.'}
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-4' noValidate>
        {isRegistration ? (
          <label className='block'>
            <span className='text-sm'>Name</span>
            <input {...form.register('name')} className='mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-foreground' />
            {form.formState.errors.name ? <p className='mt-1 text-sm text-red-300'>{form.formState.errors.name.message}</p> : null}
          </label>
        ) : null}
        <label className='block'>
          <span className='text-sm'>Email</span>
          <input {...form.register('email')} type='email' className='mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-foreground' />
          {form.formState.errors.email ? <p className='mt-1 text-sm text-red-300'>{form.formState.errors.email.message}</p> : null}
        </label>
        <label className='block'>
          <span className='text-sm'>Password</span>
          <input {...form.register('password')} type='password' className='mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-foreground' />
          {form.formState.errors.password ? <p className='mt-1 text-sm text-red-300'>{form.formState.errors.password.message}</p> : null}
        </label>
        {form.formState.errors.root ? <p className='text-sm text-red-300'>{form.formState.errors.root.message}</p> : null}
        <Button type='submit' isLoading={form.formState.isSubmitting} loadingText='Please wait' className='w-full'>
          {isRegistration ? 'Create account' : 'Sign in'}
        </Button>
      </form>

      {googleEnabled ? (
        <Button variant='outline' className='mt-4 w-full text-foreground' onClick={() => signIn('google', { callbackUrl })}>
          Continue with Google
        </Button>
      ) : null}

      <p className='mt-6 text-sm text-muted-foreground'>
        {isRegistration ? 'Already have an account?' : 'New here?'}{' '}
        <Link className='font-semibold text-white underline' href={`${isRegistration ? '/login' : '/register'}?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
          {isRegistration ? 'Sign in' : 'Create an account'}
        </Link>
      </p>
      {!isRegistration ? <Link href='/forgot-password' className='mt-3 text-sm font-semibold text-white underline'>Forgot password?</Link> : null}
    </main>
  )
}
