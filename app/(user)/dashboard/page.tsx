'use client'

import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import LoadingContent from '@/components/ui/LoadingContent'
import { useInfiniteScroll, useWindowResize } from '@/hooks'
import { useAuth, useContent } from '@/store/Store'
import { calculateColumns } from '@/utils/helper'
import { useCallback, useEffect, useState, type JSX } from 'react'
interface Res  {
      createdAt: string
      description: string
      link: string
      tags: string[]
      title: string
      type: string
      updatedAt: string
      userId: Object
      _id: string }
const Page = () => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const {
    page,
    loading: contentLoading,
    content,
    getChunks,
    hasMore,
    loadMore,
    resetState,
  } = useContent()
  const viewportWidth = useWindowResize()
  useInfiniteScroll()

  const loadContent = useCallback(() => {
    if (!loadMore && hasMore) getChunks()
  }, [loadMore, hasMore, getChunks])

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        resetState()
        getChunks(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, resetState, getChunks])

  const distributeToColumns = (items: Res[], columns: number): any[][] => {
    const columnArray: any[][] = Array.from({ length: columns }, () => [])

    items.forEach((item, index) => {
      const columnIndex = index % columns
      columnArray[columnIndex].push(item)
    })

    return columnArray
  }

  const renderColumns = (columns: JSX.Element[][]) =>
    columns.map((column, colIndex) => (
      <div key={colIndex} className="flex flex-col gap-4">
        {column.map((item: any, index: number) => (
          <Card
            // @ts-ignore
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

  return (
    <div className="screen-height p-3">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {renderColumns(columns)}
      </div>
      {loadMore && (
        <div className="flex justify-center py-6">
          <Loader />
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-offblack  pb-6 py-10">
          No more content to show
        </p>
      )}
    </div>
  )
}

export default Page
