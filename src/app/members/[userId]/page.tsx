import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'

export default async function MemberDetailPage ({ params }: {
  params: { userId: string }
}) {
  const member = await getMemberByUserId(params.userId)

  if (!member) {
    return notFound()
  }

  return (
    <div>
      {params.userId}
      {member.name}
      {member.city}
    </div>
  )
}
