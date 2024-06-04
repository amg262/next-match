'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { MessageDto } from '@/types'
import { Card } from '@nextui-org/card'
import { MessageTableCell } from '@/app/messages/MessageTableCell'
import { useMessages } from '@/hooks/useMessages'

type Props = {
  initialMessages: MessageDto[]

}
export default function MessageTable ({ initialMessages }: Props) {
  const { isOutbox, isDeleting, deleteMessage, columns, selectRow, messages } = useMessages(
    initialMessages)

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table aria-label="Table with messagse"
             selectionMode="single"
             shadow="none"
             onRowAction={(key) => {selectRow(key)}}>
        <TableHeader columns={columns}>
          {(column) =>
            <TableColumn key={column.key}
                         width={column.key === 'text' ? '50%' : undefined}>
              {column.label}
            </TableColumn>}
        </TableHeader>
        <TableBody items={initialMessages}
                   emptyContent="No messages for this container">
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell className={`${!item.dateRead &&
                !isOutbox ? 'font-semibold' : ''}`}>
                  <MessageTableCell item={item} columnKey={columnKey as string}
                                    isOutbox={isOutbox}
                                    deleteMessage={deleteMessage}
                                    isDeleting={isDeleting.loading &&
                                      isDeleting.id === item.id}/>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}