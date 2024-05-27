import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'
import CardInnerWrapper from '@/components/CardInnerWrapper'
import ChatForm from '@/app/members/[userId]/chat/ChatForm'

export default async function ChatPage ({ params }: {
  params: { userId: string }
}) {
  const member = await getMemberByUserId(params.userId)

  if (!member) {
    return notFound()
  }

  return (
    <CardInnerWrapper header="Profile"
                      body={<div>Chat goes here</div>}
                      footer={<div>{<ChatForm/>}</div>}
    />
  )
}
