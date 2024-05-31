import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { prisma } from '@/lib/prisma'

/**
 * Configure NextAuth with Prisma adapter and custom callbacks.
 *
 * @returns {Object} - The configured NextAuth handlers, auth, signIn, and signOut functions.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    /**
     * Callback to handle session creation and modification.
     *
     * @param {Object} token - The token object containing user information.
     * @param {Object} session - The session object containing session data.
     * @returns {Object} - The modified session object.
     */
    async session ({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      console.log(session)
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
