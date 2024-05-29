import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'
import CardInnerWrapper from '@/components/CardInnerWrapper'
import ChatForm from '@/app/members/[userId]/chat/ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'
import { getAuthUserId } from '@/app/actions/authActions'
import MessageList from '@/app/members/[userId]/chat/MessageList'
import { createChatId } from '@/lib/util'

export default async function ChatPage ({ params }: {
  params: { userId: string }
}) {
  const userId = await getAuthUserId()
  const messages = await getMessageThread(params.userId)
  const chatId = createChatId(userId, params.userId)

  const member = await getMemberByUserId(params.userId)

  if (!member) {
    return notFound()
  }

  return (
    <CardInnerWrapper header="Profile"
                      body={<MessageList initialMessages={messages}
                                         currentUserId={userId}
                                         chatId={chatId}
                      />}
                      footer={<ChatForm/>}
    />
  )
}
