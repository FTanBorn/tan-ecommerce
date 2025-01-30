// src/app/layout.tsx

import React from 'react'

import Header from '@/components/layout/Header'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='tr'>
      <body className='min-h-screen bg-gray-50'>
        <Providers>
          <Header />
          <main className='container mx-auto px-1 py-8'>
            <div className='flex gap-6'>
              <div className='flex-1'>{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
