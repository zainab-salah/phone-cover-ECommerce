import { NextResponse } from 'next/server'

import { getAuthSession } from '@/auth'
import { db } from '@/db'
import { sendVerificationEmail } from '@/lib/email-verification'

export async function POST() {
  const session = await getAuthSession()
  if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, name: true, emailVerified: true },
  })
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  if (user.emailVerified) return NextResponse.json({ ok: true })

  try {
    await sendVerificationEmail(user)
  } catch (error) {
    console.error('Could not send verification email', error)
    return NextResponse.json({ message: 'Could not send verification email. Please try again later.' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
