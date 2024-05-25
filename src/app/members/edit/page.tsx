import { getMemberByUserId } from '@/app/actions/memberActions'
import { CardBody, CardHeader, Divider } from '@nextui-org/react'
import EditForm from '@/app/members/edit/EditForm'
import { getAuthUserId } from '@/app/actions/authActions'
import { notFound } from 'next/navigation'

export default async function MemberEditPage () {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)

  if (!member) {
    return notFound()
  }

  return (
    <div>
      <div>
        <CardHeader className="text-2xl font-semibold text-secondary">
          Edit Profile
        </CardHeader>
        <Divider/>
        <CardBody>
          <EditForm member={member}/>
        </CardBody>
      </div>
    </div>
  )
}
