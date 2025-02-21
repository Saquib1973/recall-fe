'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Arrow from '../icons/Arrow'

export default function PrivacyNotice() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-3 w-full bg-white-1.5 dark:bg-black-2 rounded-md text-red-2 p-4 flex flex-col items-center ">
      <button
        className="w-full flex justify-between items-center underline underline-offset-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚠ Privacy Notice
        <span>
          <Arrow
            size="sm"
            css={`stroke-black-1 dark:stroke-white-1 transition-all duration-500 ${
              !isOpen ? '-rotate-90' : 'rotate-90'
            }`}
          />
        </span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-sm  text-black-1 dark:text-white-2 mt-2"
      >
        <p>
          Anyone with this link can view your recall. Please ensure you share it
          only with trusted individuals.
        </p>
      </motion.div>
    </div>
  )
}
