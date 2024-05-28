'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { MessageDto } from '@/types'
import { Key, useCallback, useState } from 'react'
import { Card } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { AiFillDelete } from 'react-icons/ai'
import { deleteMessage } from '@/app/actions/messageActions'
import { truncateString } from '@/lib/util'

type Props = {
  messages: MessageDto[]

}
export default function MessageTable ({ messages }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isOutbox = searchParams.get('container') === 'outbox'
  const [isDeleting, setDeleting] = useState({ id: '', loading: false })

  const columns = [
    {
      key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox
        ? 'Recipient'
        : 'Sender',
    },
    { key: 'text', label: 'Message' },
    { key: 'createdAt', label: isOutbox ? 'Date Sent' : 'Date Received' },
    { key: 'actions', label: 'Actions' },
  ]

  const handleDeleteMessage = useCallback(async (message: MessageDto) => {
    setDeleting({ id: message.id, loading: true })
    await deleteMessage(message.id, isOutbox)
    router.refresh()
    setDeleting({ id: '', loading: false })
  }, [isOutbox, router])

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key)
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`
    router.push(url + '/chat')
  }

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      const cellValue = item[columnKey]

      switch (columnKey) {
        case 'recipientName':
        case 'senderName':
          return (
            <div
              className="flex items-center gap-2 cursor-pointer">
              <Avatar alt="image of memeber" src={(isOutbox
                ? item.recipientImage
                : item.senderImage) || '/images/user.png'}/>
            </div>
          )
        case 'text':
          return (
            <div className={`truncate`}>
              {truncateString(cellValue, 80)}
            </div>
          )
        case 'createdAt':
          return cellValue
        default:
          return (
            <Button isIconOnly variant="light"
                    onClick={() => handleDeleteMessage(item)}
                    isLoading={isDeleting.id === item.id && isDeleting.loading}>
              <AiFillDelete size={24} className="text-danger"/>
            </Button>
          )
      }
    }, [handleDeleteMessage, isDeleting.id, isDeleting.loading, isOutbox])

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table aria-label="Table with messagse"
             selectionMode="single"
             shadow="none"
             onRowAction={(key) => {handleRowSelect(key)}}>
        <TableHeader columns={columns}>
          {(column) =>
            <TableColumn key={column.key}
                         width={column.key === 'text' ? '50%' : undefined}>
              {column.label}
            </TableColumn>}
        </TableHeader>
        <TableBody items={messages}
                   emptyContent="No messages for this container">
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell className={`${!item.dateRead &&
                !isOutbox ? 'font-semibold' : ''}`}>
                  {renderCell(item, columnKey as keyof MessageDto)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table></Card>
  )
}