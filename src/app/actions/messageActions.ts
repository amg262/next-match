'use server'

import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema'
import { Message } from '@prisma/client'
import { ActionResult } from '@/types'
import { getAuthUserId } from '@/app/actions/authActions'
import { prisma } from '@/lib/prisma'
import { mapMessageToMessageDto } from '@/lib/mappings'

export async function createMessage (
  recipeintId: string, data: MessageSchema): Promise<ActionResult<Message>> {
  try {
    const userId = await getAuthUserId()
    const validated = messageSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    const { text } = validated.data

    const messwage = await prisma.message.create({
      data: {
        text,
        senderId: userId,
        recipientId: recipeintId,
      },
    })
    return { status: 'success', data: messwage }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Something went wrong!' }
  }
}

export async function getMessageThread (recipientId: string) {
  try {
    const userId = await getAuthUserId()

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    })

    if (messages.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: { dateRead: new Date() },
      })
    }

    // @ts-ignore
    return messages.map(message => mapMessageToMessageDto(message))
  } catch (error) {
    console.log(error)
    throw error
  }
}