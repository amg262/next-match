import { getMembers } from '@/app/actions/memberActions'
import { fetchCurrentUserLikeIds } from '@/app/actions/likeActions'
import MessageSidebar from '@/app/messages/MessageSidebar'
import { getMessagesByContainer } from '@/app/actions/messageActions'
import MessageTable from '@/app/messages/MessageTable'

export default async function MessagesPage ({ searchParams }: {
  searchParams: { container: string }
}) {
  const members = await getMembers()
  const likeIds = await fetchCurrentUserLikeIds()
  const messages = await getMessagesByContainer(searchParams.container)
  console.log('messages', messages)

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar/>
      </div>
      <div className="col-span-10">
        <MessageTable initialMessages={messages}/>
      </div>
    </div>
  )
}
