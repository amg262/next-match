import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'
import CardInnerWrapper from '@/components/CardInnerWrapper'
import ChatForm from '@/app/members/[userId]/chat/ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'
import { getAuthUserId } from '@/app/actions/authActions'

export default async function ChatPage ({ params }: {
  params: { userId: string }
}) {
  const userId = await getAuthUserId()
  const messages = await getMessageThread(params.userId)
  console.log(messages)
  const body = (
    <div>
      {messages.length === 0 ? 'No messages to display' : (
        <div>
          {messages.map(message => (
            <div key={message.id}>
              {message.text}
            </div>))}
        </div>
      )}
    </div>
  )

  const member = await getMemberByUserId(params.userId)

  if (!member) {
    return notFound()
  }

  return (
    <CardInnerWrapper header="Profile"
                      body={body}
                      footer={<ChatForm/>}
    />
  )
}
