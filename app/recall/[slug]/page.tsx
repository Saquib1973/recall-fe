"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
  const pathname = usePathname()
  return (
    <div>
      {pathname}
      Recall Slugg Page
    </div>
  )
}

export default page
