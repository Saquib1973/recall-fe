'use client'

import { motion } from 'framer-motion'
import React, { useCallback, useEffect } from 'react'
import { create } from 'zustand'

interface ImageItem {
  id: number
  url: string
}

interface ImageState {
  images: ImageItem[]
  page: number
  loading: boolean
  addImages: (newImages: ImageItem[]) => void
  incrementPage: () => void
  setLoading: (loading: boolean) => void
}

const useImageStore = create<ImageState>((set) => ({
  images: [],
  page: 1,
  loading: false,
  addImages: (newImages) =>
    set((state) => ({
      images: [...state.images, ...newImages],
      loading: false,
    })),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  setLoading: (loading) => set(() => ({ loading })),
}))

// Simulate fetching images
const fetchImages = async (
  page: number,
  count: number
): Promise<ImageItem[]> => {
  return new Promise((resolve) => {
    const images: ImageItem[] = []
    for (let i = 1; i <= count; i++) {
      const width = Math.floor(Math.random() * (800 - 400 + 1)) + 400
      const height = Math.floor(Math.random() * (1200 - 600 + 1)) + 600
      images.push({
        id: page * count + i,
        url: `https://picsum.photos/${width}/${height}?random=${
          page * count + i
        }`,
      })
    }
    setTimeout(() => resolve(images), 1000) // Simulate network delay
  })
}

const MasonryGrid: React.FC = () => {
  const { images, page, loading, addImages, incrementPage, setLoading } =
    useImageStore()

  // Fetch images when needed
  const loadImages = useCallback(async () => {
    if (loading) return

    setLoading(true)
    const newImages = await fetchImages(page, 20)
    addImages(newImages)
    incrementPage()
  }, [page, loading, addImages, incrementPage, setLoading])

  // Initial load
  useEffect(() => {
    loadImages()
  }, [])

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      !loading
    ) {
      loadImages()
    }
  }, [loading, loadImages])

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Distribute images into columns
  const distributeToColumns = (images: ImageItem[], columns: number) => {
    const columnArrays = Array.from({ length: columns }, () => [])
    images.forEach((img, index) => {
      // @ts-ignore
      columnArrays[index % columns].push(img)
    })
    return columnArrays
  }

  const renderColumns = (columns: ImageItem[][]) =>
    columns.map((column, colIndex) => (
      <motion.div
        key={colIndex}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: colIndex * 0.1 }}
      >
        {column.map((image) => (
          <motion.img
            key={image.id}
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-full object-cover rounded-xl shadow-md"
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>
    ))

  // Responsive grid column count
  const columns = distributeToColumns(images, 6)

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-8">Masonry Grid</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {renderColumns(columns)}
      </div>
      {loading && (
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  )
}

export default MasonryGrid
