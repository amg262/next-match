'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Providers ({ children }: {
  children: React.ReactNode
}) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" className="z-50"/>
      {children}
    </NextUIProvider>
  )
}