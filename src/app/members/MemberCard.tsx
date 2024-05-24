import { Member } from '@prisma/client'
import { Card, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
import { calculateAge } from '@/lib/util'

type Props = {
  member: Member
}

export function MemberCard ({ member }: Props) {
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed={true}
        src={member.image || '/images/user.png'}
        alt={member.name}
        width={300}
        className="aspect-square object-cover"
      />
      <CardFooter
        className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">{member.name}, {calculateAge(
            member.dateOfBirth)}</span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  )
}