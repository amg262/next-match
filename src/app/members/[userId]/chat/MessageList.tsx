'use client'

import MessageBox from '@/app/members/[userId]/chat/MessageBox'
import { MessageDto } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher'

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}
export default function MessageList ({ initialMessages, currentUserId, chatId }: Props) {
  const [messages, setMessages] = useState(initialMessages)

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages(prevMessages => {
      return [...prevMessages, message]
    })
  }, [])

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId)
    channel.bind('message:new', handleNewMessage)
    return () => {
      channel.unsubscribe()
      channel.unbind('message:new', handleNewMessage)
    }
  }, [chatId, handleNewMessage])

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