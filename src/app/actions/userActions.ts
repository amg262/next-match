'use server'

import {
  memberEditSchema,
  MemberEditSchema,
} from '@/lib/schemas/memberEditSchema'
import { ActionResult } from '@/types'
import { Member } from '@prisma/client'
import { getAuthUserId } from './authActions'
import { prisma } from '@/lib/prisma'

export async function updateMemberProfile (data: MemberEditSchema): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId()
    const validated = memberEditSchema.safeParse(data)
    if (!validated.success) {
      return { status: 'error', error: validated.error.errors[0].message }
    }

    const { name, description, city, country } = validated.data

    const member = await prisma.member.update({
      where: { userId },
      data: { name, description, city, country },
    })
    return { status: 'success', data: member }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Failed to update member profile' }
  }
}

export async function addImage (url: string, publicId: string) {
  try {
    const userId = await getAuthUserId()
    const member = await prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            { url, publicId },
          ],
        },
      },
    })
    return { status: 'success', data: member }
  } catch (error) {
    console.error(error)
    throw error
  }
}