import { getMembers } from '@/app/actions/memberActions'
import { fetchCurrentUserLikeIds } from '@/app/actions/likeActions'
import MessageSidebar from '@/app/messages/MessageSidebar'

export default async function MessagesPage () {
  const members = await getMembers()
  const likeIds = await fetchCurrentUserLikeIds()

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        Message Table goes here
      </div>
    </div>
  )
}
