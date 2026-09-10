import { createHash, randomBytes } from 'crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

import { db } from '@/db'

const emailSchema = z.object({ email: z.string().email() })

export async function POST(request: Request) {
  const parsed = emailSchema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json({ message: 'Enter a valid email address.' }, { status: 400 })
  }

  const email = parsed.data.email.toLowerCase()
  const user = await db.user.findUnique({ where: { email } })

  if (user) {
    const rawToken = randomBytes(32).toString('hex')
    const token = createHash('sha256').update(rawToken).digest('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000)

    const identifier = `password-reset:${email}`
    await db.verificationToken.deleteMany({ where: { identifier } })
    await db.verificationToken.create({ data: { identifier, token, expires } })

    const appUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXTAUTH_URL
    if (!appUrl || !process.env.RESEND_API_KEY) {
      console.error('Password reset email is not configured.')
      return NextResponse.json({ message: 'Password reset is not configured yet.' }, { status: 503 })
    }

    const resetUrl = new URL('/reset-password', appUrl)
    resetUrl.searchParams.set('token', rawToken)

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'BSMA Case <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your BSMA Case password',
      html: `<p>We received a request to reset your BSMA Case password.</p><p><a href="${resetUrl.toString()}">Reset your password</a></p><p>This link expires in one hour. If you did not request it, you can ignore this email.</p>`,
    })

    if (error) {
      console.error('Could not send password reset email', error)
      return NextResponse.json({ message: 'Could not send the reset email. Please try again later.' }, { status: 503 })
    }
  }

  return NextResponse.json({ ok: true })
}
