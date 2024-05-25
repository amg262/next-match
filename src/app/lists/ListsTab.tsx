'use client'

import { Member } from '@prisma/client'
import { Tab, Tabs } from '@nextui-org/react'
import { Key, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MemberCard } from '@/app/members/MemberCard'
import LoadingComponent from '@/components/LoadingComponent'

type Props = {
  members: Member[]
  likedIds: string[]
}
export default function ListsTab ({ members, likedIds }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const tabs = [
    { id: 'source', label: 'Members I like' },
    { id: 'target', label: 'Members that like me' },
    { id: 'mutual', label: 'Mutual likes' },
  ]

  function handleTabChange (key: Key) {
    startTransition(() => {
      const params = new URLSearchParams()
      params.set('type', key.toString())
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs aria-label="Like tabs" items={tabs} color="secondary"
            onSelectionChange={(key) => handleTabChange(key)}>
        {(item) => (
          <Tab key={item.id} value={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent/>
            ) : (
              <>
                {members.length > 0 ? (
                  <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl-grid-cols-6 gap-8">
                    {members.map(member => (
                      <MemberCard key={member.id} member={member}
                                  likeIds={likedIds}/>
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}