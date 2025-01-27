'use client'
import { memo, useCallback } from 'react'
import { useContent } from '@/store/Store'
import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import { useWindowResize, useInfiniteScroll } from '@/hooks'

const InfiniteScrollContent = memo(() => {
  const viewportWidth = useWindowResize()
  const { content, loadMore, hasMore } = useContent()
  const { loadMore: isLoading } = useInfiniteScroll()

  const calculateColumns = useCallback((width: number) => {
    if (width < 640) return 1
    if (width < 768) return 2
    if (width < 1024) return 3
    if (width < 1280) return 4
    if (width < 1536) return 5
    return 6
  }, [])

  const distributeToColumns = useCallback((items: any[], columns: number) => {
    const columnArray = Array.from({ length: columns }, () => [])
    //@ts-ignore
    items.forEach((item, index) => columnArray[index % columns].push(item))
    return columnArray
  }, [])

  const columns = distributeToColumns(content, calculateColumns(viewportWidth))

  return (
    <div className="screen-height p-3">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((item) => (
              //@ts-ignore
              <Card key={item._id} {...item} />
            ))}
          </div>
        ))}
      </div>

      {loadMore && <Loader />}
      {!hasMore && <p className="text-center py-6">No more content</p>}
    </div>
  )
})

InfiniteScrollContent.displayName = 'InfiniteScrollContent'
export default InfiniteScrollContent