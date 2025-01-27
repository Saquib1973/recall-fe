'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BackGround = () => {
  const [items, setItems] = useState<Array<{ height: number; color: string }>>(
    []
  )
  const randomColors = [
    'bg-red-50',
    'bg-blue-50',
    'bg-green-50',
    'bg-yellow-50',
    'bg-pink-50',
    'bg-purple-50',
    'bg-indigo-50',
    'bg-gray-50',
    'bg-cyan-50',
    'bg-rose-50',
    'bg-emerald-50',
    'bg-violet-50',
    'bg-sky-50',
    'bg-amber-50',
    'bg-lime-50',
    'bg-orange-50',
  ]

  useEffect(() => {
    const generatedItems = new Array(40).fill(0).map(() => {
      const randomHeight = Math.floor(Math.random() * 400) + 200
      const randomColor =
        randomColors[Math.floor(Math.random() * randomColors.length)]
      return { height: randomHeight, color: randomColor }
    })
    setItems(generatedItems)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0.2}}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 10,
        ease: 'linear',
      }}
      className="max-h-screen fixed inset-0 overflow-hidden -z-50"
    >
      <motion.div
        className="space-y-6 sm:space-y-3 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-3 p-4"
        initial={{ y: -5 }}
        animate={{ y: -1500 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 60,
          ease: 'linear',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`break-inside-avoid rounded-3xl gap-4 flex flex-col ${item.color} text-black`}
            style={{ height: `${item.height}px` }}
          ></div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default BackGround
