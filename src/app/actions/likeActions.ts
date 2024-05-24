'use server'

import { prisma } from '@/lib/prisma'
import { getAuthUserId } from '@/app/actions/authActions'

export async function toggleLikeMember (
  targetUserId: string, isLiked: boolean) {
  try {
    const userId = await getAuthUserId()

    if (isLiked) {
      await prisma.like.delete({
          where: {
            sourceUserId_targetUserId: {
              sourceUserId: userId,
              targetUserId,
            },
          },
        },
      )
    } else {
      await prisma.like.create({
          data: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      )
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchCurrentUserLikeIds () {
  try {
    const userId = await getAuthUserId()
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    })

    const likes = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
    })
    return likeIds.map((like) => like.targetUserId)
  } catch (error) {
    console.error(error)
    throw error
  }
}