'use client'

import MessageBox from '@/app/members/[userId]/chat/MessageBox'
import { MessageDto } from '@/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { pusherClient } from '@/lib/pusher'
import { formatShortDateTime } from '@/lib/util'
import { Channel } from 'pusher-js'

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}
export default function MessageList ({ initialMessages, currentUserId, chatId }: Props) {
  const [messages, setMessages] = useState(initialMessages)
  const setReadCont = useRef(false)
  const channelRef = useRef<Channel | null>(null)

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages(prevMessages => {
      return [...prevMessages, message]
    })
  }, [])

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages(prevMessages => prevMessages.map(message => messageIds.includes(
      message.id)
      ? { ...message, dateRead: formatShortDateTime(new Date()) }
      : message,
    ))
  }, [])

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId)
      channelRef.current.bind('message:new', handleNewMessage)
      channelRef.current.bind('messages:read', handleReadMessages)
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe()
        channelRef.current.unbind('message:new', handleNewMessage)
        channelRef.current.unbind('messages:read', handleReadMessages)
      }
    }
  }, [chatId, handleNewMessage, handleReadMessages])

  return (
    <div>
      {messages.length === 0 ? 'No messages to display' : (
        <div>
          {messages.map(message => (
            <MessageBox key={message.id}
                        message={message}
                        currentUserId={currentUserId}/>
          ))}
        </div>
      )}
    </div>
  )
}