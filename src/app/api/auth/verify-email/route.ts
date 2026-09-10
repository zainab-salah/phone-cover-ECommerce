import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

import { db } from '@/db'

const prefix = 'email-verification:'

export async function GET(request: Request) {
  const rawToken = new URL(request.url).searchParams.get('token')
  const appUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.NEXTAUTH_URL ?? new URL(request.url).origin
  if (!rawToken) return NextResponse.redirect(new URL('/login?verification=invalid', appUrl))

  const token = createHash('sha256').update(rawToken).digest('hex')
  const verificationToken = await db.verificationToken.findUnique({ where: { token } })

  if (!verificationToken || !verificationToken.identifier.startsWith(prefix) || verificationToken.expires < new Date()) {
    if (verificationToken) await db.verificationToken.delete({ where: { token } })
    return NextResponse.redirect(new URL('/login?verification=invalid', appUrl))
  }

  const email = verificationToken.identifier.slice(prefix.length)
  await db.$transaction([
    db.user.update({ where: { email }, data: { emailVerified: new Date() } }),
    db.verificationToken.delete({ where: { token } }),
  ])

  return NextResponse.redirect(new URL('/login?verification=success', appUrl))
}
