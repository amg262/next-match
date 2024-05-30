import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'
import TopNav from '@/components/nav/Topnav'
import React from 'react'

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NextMatch',
  description: 'Generated by create next app',
}

export default function RootLayout ({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <Providers>
      <TopNav/>
      <main className="container mx-auto p-10">
        {children}
      </main>
    </Providers>
    </body>
    </html>
  )
}
