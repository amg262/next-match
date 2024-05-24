import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'
import { CardBody, CardHeader, Divider } from '@nextui-org/react'

export default async function ChatPage ({ params }: {
  params: { userId: string }
}) {
  const member = await getMemberByUserId(params.userId)

  if (!member) {
    return notFound()
  }

  return (
    <div>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Chat
      </CardHeader>
      <Divider/>
      <CardBody>
        Chat goes here
      </CardBody>
    </div>
  )
}
