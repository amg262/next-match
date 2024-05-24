'use client'

import { Member } from '@prisma/client'
import { Card, CardFooter, Divider, Image } from '@nextui-org/react'
import { CardBody } from '@nextui-org/card'
import { calculateAge } from '@/lib/util'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/button'

type Props = {
  member: Member
}
export default function MemberSidebar ({ member }: Props) {
  const pathName = usePathname()
  const basePath = `/members/${member.userId}`
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    { name: 'Photos', href: `${basePath}/photos` },
    { name: 'Chat', href: `${basePath}/chat` },
  ]

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        src={member.image || '/images/user.png'}
        alt={member.name || 'User profile image'}
        width={200}
        height={200}
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </div>
          <div
            className="text-sm text-neutral-500">{member.city}, {member.country}</div>
        </div>
        <Divider className="my-3"/>
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map(link => (

            <Link key={link.name} href={link.href}
                  className={`block rounded ${pathName === link.href
                    ? 'text-secondary'
                    : 'hover:text-secondary/50'}`}>
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button as={Link} href="/members" variant="bordered" fullWidth
                color="secondary">
          Go back
        </Button>
      </CardFooter>
    </Card>
  )
}