import React from 'react'
import { AnimatePresence } from 'framer-motion';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className='border p-6 rounded-2xl max-w-[400px] w-full'>
        {children}
      </div>
    </div>
  )
}
