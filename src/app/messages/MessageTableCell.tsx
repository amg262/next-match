import PresenceAvatar from '@/components/PresenceAvatar'
import { truncateString } from '@/lib/util'
import { Button } from '@nextui-org/button'
import { AiFillDelete } from 'react-icons/ai'
import { MessageDto } from '@/types'

type Props = {
  item: MessageDto
  isOutbox: boolean
  isDeleting: boolean
  deleteMessage: (message: MessageDto) => void
  columnKey: string
}

export function MessageTableCell ({ item, isOutbox, isDeleting, deleteMessage, columnKey }: Props) {
  const cellValue = item[columnKey as keyof MessageDto]

  switch (columnKey) {
    case 'recipientName':
    case 'senderName':
      return (
        <div
          className="flex items-center gap-2 cursor-pointer">
          <PresenceAvatar
            userId={isOutbox ? item.recipientId : item.senderId}
            src={isOutbox ? item.recipientImage : item.senderImage}
          />
          <span>{cellValue}</span>
        </div>
      )
    case 'text':
      return (
        <div className={`truncate`}>
          {truncateString(cellValue, 80)}
        </div>
      )
    case 'created':
      return cellValue
    default:
      return (
        <Button isIconOnly variant="light"
                onClick={() => deleteMessage(item)}
                isLoading={isDeleting}>
          <AiFillDelete size={24} className="text-danger"/>
        </Button>
      )
  }
}