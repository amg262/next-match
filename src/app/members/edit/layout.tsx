import { getMemberByUserId } from '@/app/actions/memberActions'
import MemberSidebar from '@/app/members/MemberSidebar'
import { notFound } from 'next/navigation'
import { Card } from '@nextui-org/card'
import React from 'react'
import { getAuthUserId } from '@/app/actions/authActions'

export default async function Layout ({ children }: {
  children: React.ReactNode
}) {
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)
  const basePath = `/members/edit`
  const navLinks = [
    { name: 'Edit Profile', href: `${basePath}` },
    { name: 'Update Photos', href: `${basePath}/photos` },
  ]
  if (!member) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar navLinks={navLinks} member={member}/>
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">
          {children}
        </Card>
      </div>
    </div>
  )
}