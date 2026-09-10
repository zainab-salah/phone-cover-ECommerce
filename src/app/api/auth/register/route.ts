import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { db } from '@/db'
import { sendVerificationEmail } from '@/lib/email-verification'

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  name: z.string().trim().min(1).max(100).optional(),
})

export async function POST(request: Request) {
  const parsed = registrationSchema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'Invalid registration details.' },
      { status: 400 }
    )
  }

  const email = parsed.data.email.toLowerCase()
  const existingUser = await db.user.findUnique({ where: { email } })

  if (existingUser) {
    return NextResponse.json(
      { message: 'An account with this email already exists.' },
      { status: 409 }
    )
  }

  const user = await db.user.create({
    data: {
      email,
      name: parsed.data.name || null,
      passwordHash: await hash(parsed.data.password, 12),
    },
  })

  try {
    await sendVerificationEmail(user)
  } catch (error) {
    console.error('Could not send verification email', error)
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
