import { createHash } from 'crypto'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { db } from '@/db'

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export async function POST(request: Request) {
  const parsed = resetSchema.safeParse(await request.json())

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'Invalid password reset request.' },
      { status: 400 }
    )
  }

  const token = createHash('sha256').update(parsed.data.token).digest('hex')
  const resetToken = await db.verificationToken.findUnique({ where: { token } })

  if (!resetToken || !resetToken.identifier.startsWith('password-reset:') || resetToken.expires < new Date()) {
    if (resetToken) await db.verificationToken.delete({ where: { token } })
    return NextResponse.json({ message: 'This reset link is invalid or has expired.' }, { status: 400 })
  }

  await db.$transaction([
    db.user.update({
      where: { email: resetToken.identifier.slice('password-reset:'.length) },
      data: { passwordHash: await hash(parsed.data.password, 12) },
    }),
    db.verificationToken.delete({ where: { token } }),
  ])

  return NextResponse.json({ ok: true })
}
