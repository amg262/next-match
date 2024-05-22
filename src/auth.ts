import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      console.log(token)
      console.log(session)
      return session
    },
    // async jwt ({ token }) {
    //   console.log(token)
    //   return token
    // },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})