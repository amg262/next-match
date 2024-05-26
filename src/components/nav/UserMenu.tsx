'use client'

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
  userInfo: {
    name: string | null,
    image: string | null;
  } | null | undefined
}
export default function UserMenu ({ userInfo }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={userInfo?.name || 'user'}
          size="sm"
          alt={userInfo?.name || 'user'}
          src={userInfo?.image || '/images/user.png'}/>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as="span" className="h-14 flex flex-row"
                        aria-label="username">
            Signed in as <strong>{userInfo?.name || 'user'}</strong>
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