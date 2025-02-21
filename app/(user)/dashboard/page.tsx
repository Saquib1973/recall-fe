'use client'

import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import LoadingContent from '@/components/ui/LoadingContent'
import { useInfiniteScroll, useWindowResize } from '@/hooks'
import { useAuth, useContent } from '@/store/Store'
import { calculateColumns } from '@/utils/helper'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface Res {
  createdAt: string
  description: string
  link: string
  tags: string[]
  title: string
  type: "twitter" | "youtube" | "pinterest" | "instagram" | "others"
  updatedAt: string
  userId: { username: string; _id: string }
  _id: string
}
const Page = () => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const {
    loading: contentLoading,
    content,
    getChunks,
    hasMore,
    loadMore,
    resetState,
    sharedLink,
  } = useContent()
  console.log(content)
  const viewportWidth = useWindowResize()
  useInfiniteScroll()

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        resetState()
        getChunks(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, resetState, getChunks])

  const distributeToColumns = (items: Res[], columns: number): Res[][] => {
    const columnArray: Res[][] = Array.from({ length: columns }, () => [])

    items.forEach((item, index) => {
      const columnIndex = index % columns
      columnArray[columnIndex].push(item)
    })

    return columnArray
  }

  const renderColumns = (columns: Res[][]) =>
    columns.map((column, colIndex) => (
      <div key={`column-${colIndex}-${column.length}`} className="flex flex-col relative gap-5">
        {column.map((item: Res) => (
          <Card
            index={colIndex}
            key={item._id}
            id={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            description={item.description}
            tags={item.tags}
            user={item.userId}
          />
        ))}
      </div>
    ))

  const columns = distributeToColumns(content, calculateColumns(viewportWidth))

  if (authLoading || contentLoading) {
    return (
      <LoadingContent message="We're bringing all your Recall's to your home feed!" />
    )
  }
  const handleCopy = () => {
    if (!sharedLink) return

    navigator.clipboard.writeText(sharedLink)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  console.log("SharedLink",sharedLink)
  return (
    <div className="screen-height">
      {sharedLink && (
        <div className="w-full py-1 border-y border-white-2 dark:border-black-2 flex items-center pr-4 justify-end">
          <div className='w-full relative'>
            <div className="flex overflow-hidden">
              <motion.div
                className='shrink-0 whitespace-nowrap flex  bg-clip-text text-black-3 dark:text-white-3 font-bold'
                initial={{ x: "0%" }}
                animate={{ x: "-50%" }}
                transition={{
                  repeat: Infinity,
                  duration: 50,
                  ease: "linear"
                }}
              >
                {[...Array(25)].map((_, i) => (
                  <span key={i} className="mr-8 text-xl">
                    Shared Link 🔗
                  </span>
                ))}
                {[...Array(25)].map((_, i) => (
                  <span key={`dup-${i}`} className="mr-8 text-xl">
                    Shared Link 🔗
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="bg-white-2 dark:bg-black-2 dark:text-white-2 text-black-2 z-10 text-lg text-center p-1 px-4 flex items-center shadow-inner pr-1 w-fit justify-between gap-3 rounded-full cursor-pointer"
            aria-label="Copy shared link"
          >
            {sharedLink}
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.3 }}
                  className="bg-green-600 text-lg text-center text-white-1 shadow-inner rounded-full p-0.5 px-2 "
                >
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white-1 dark:bg-black-1 text-lg text-center shadow-inner cursor-pointer rounded-full p-0.5 px-2 "
                >
                  Copy
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      )}
      <div className="grid gap-5 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {renderColumns(columns)}
      </div>
      {loadMore && (
        <div className="flex justify-center py-6">
          <Loader />
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-offblack  pb-6 py-10 ">
          No more content to show
        </p>
      )}
    </div>
  )
}

export default Page
