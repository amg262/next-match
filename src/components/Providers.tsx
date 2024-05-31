'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { usePresenceChannel } from '@/hooks/usePresenceChannel'
import { useNotificationChannel } from '@/hooks/useNotificationChannel'

export default function Providers ({ children, userId }: {
  children: React.ReactNode,
  userId: string | null
}) {
  usePresenceChannel()
  useNotificationChannel(userId)

  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" className="z-50"/>
      {children}
    </NextUIProvider>
  )
}