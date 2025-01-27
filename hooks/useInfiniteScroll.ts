import { useEffect } from 'react'
import { useContent } from '@/store/Store'

export const useInfiniteScroll = () => {
  const { hasMore, loadMore, getChunks } = useContent()

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 200 && hasMore && !loadMore) {
        getChunks()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, loadMore, getChunks])

  return { hasMore, loadMore }
}