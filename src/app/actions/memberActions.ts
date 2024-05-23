'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function getMembers () {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  try {
    return prisma.member.findMany(
      { where: { NOT: { userId: session.user.id } } })
  } catch (error) {
    console.error(error)
  }
}