import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { z } from 'zod'

import { db } from '@/db'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Email and password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const parsed = credentialsSchema.safeParse(credentials)
      if (!parsed.success) return null

      const user = await db.user.findUnique({
        where: { email: parsed.data.email.toLowerCase() },
      })

      if (!user?.passwordHash) return null

      const passwordMatches = await compare(parsed.data.password, user.passwordHash)
      if (!passwordMatches) return null

      return { id: user.id, email: user.email, name: user.name }
    },
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers,
  pages: { signIn: '/login' },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub
      return session
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
