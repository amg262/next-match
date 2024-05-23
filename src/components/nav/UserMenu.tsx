'use client'

import { Session } from 'next-auth'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import Link from 'next/link'
import { signOutUser } from '@/app/actions/authActions'

type Props = {
  user: Session['user']
}
export default function UserMenu ({ user }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name || 'user'}
          size="sm"
          alt={user?.name || 'user'}
          src={user?.image || '/images/user.png'}/>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as="span" className="h-14 flex flex-row"
                        aria-label="username">
            Signed in as <strong>{user?.name || 'user'}</strong>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownItem color="danger" onClick={async () => signOutUser()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}