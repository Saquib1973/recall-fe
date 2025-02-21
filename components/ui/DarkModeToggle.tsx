// components/DarkModeToggle.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSetTheme, useTheme } from '@/store/themeStore'

const DarkModeToggle = () => {
  const theme = useTheme()
  const setTheme = useSetTheme()

  const variants = {
    svg: {
      initial: { rotate: 0 },
      animate: { rotate: 180 },
    },
    path: {
      initial: { pathLength: 0 },
      animate: {
        pathLength: 1,
        transition: { duration: 0.7, ease: 'easeInOut' },
      },
      exit: {
        pathLength: 0,
        transition: { duration: 0.7, ease: 'easeInOut' },
      },
    },
  }

  const iconPath =
    theme === 'dark'
      ? 'M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
      : 'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'

  return (
    <button
      onClick={setTheme}
      className="border p-2 dark:border-black-3 rounded-full inline-block w-fit dark:text-white-1 transition"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="md: size-5 size-4 lg:size-6 -rotate-60"
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <motion.path
          key={theme === 'dark' ? 'moon' : 'sun'}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={variants.path}
          initial="initial"
          animate="animate"
          exit="exit"
          d={iconPath}
        />
      </motion.svg>
    </button>
  )
}

export default DarkModeToggle
