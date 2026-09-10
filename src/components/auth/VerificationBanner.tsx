'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

export default function VerificationBanner({ email }: { email: string }) {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function resend() {
    setIsSending(true)
    const response = await fetch('/api/auth/send-verification', { method: 'POST' })
    setIsSending(false)
    setMessage(response.ok ? 'A new verification email has been sent.' : 'Could not send the email. Please try again later.')
  }

  return (
    <div className='bg-gold px-4 py-3 text-center text-sm text-black'>
      <span>Verify <strong>{email}</strong> to receive order updates. </span>
      <Button onClick={resend} isLoading={isSending} loadingText='Sending' size='sm' variant='outline' className='ml-2 border-black bg-transparent text-black hover:bg-black hover:text-white'>Resend email</Button>
      {message ? <p className='mt-1'>{message}</p> : null}
    </div>
  )
}
