"use client"
import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/ui/Footer';
import { useAuth } from '@/store/Store';
import { useRouter } from 'next/navigation';


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { token} = useAuth()

  const router = useRouter()

  useEffect(() => {

// router.push("/")
  }, [token])


  return (
    <>
    <div className="flex min-h-screen w-full flex-col">
        {children}
    </div>
    <Footer/>
    </>
  )
}
