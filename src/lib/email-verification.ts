import { createHash, randomBytes } from 'crypto'
import { Resend } from 'resend'

import VerifyEmail from '@/components/emails/VerifyEmail'
import { db } from '@/db'

const tokenIdentifier = (email: string) => `email-verification:${email}`

export async function sendVerificationEmail(user: { email: string; name?: string | null }) {
  const appUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXTAUTH_URL
  if (!appUrl || !process.env.RESEND_API_KEY) throw new Error('Email verification is not configured.')

  const rawToken = randomBytes(32).toString('hex')
  const token = createHash('sha256').update(rawToken).digest('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000)

  await db.verificationToken.deleteMany({ where: { identifier: tokenIdentifier(user.email) } })
  await db.verificationToken.create({ data: { identifier: tokenIdentifier(user.email), token, expires } })

  const verifyUrl = new URL('/api/auth/verify-email', appUrl)
  verifyUrl.searchParams.set('token', rawToken)

  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: process.env.EMAIL_FROM ?? 'KainyCase <onboarding@resend.dev>',
    to: user.email,
    subject: 'Verify your KainyCase email',
    react: VerifyEmail({ name: user.name, verifyUrl: verifyUrl.toString() }),
  })

  if (error) throw new Error(error.message)
}
