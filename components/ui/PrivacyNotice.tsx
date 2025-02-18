'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Arrow from '../icons/Arrow'

export default function PrivacyNotice() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-3 w-full bg-red-50 text-red-600 p-4 flex flex-col items-center ">
      <button
        className="w-full flex justify-between items-center font-semibold text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚠ Privacy Notice
        <span>
          <Arrow
            size="sm"
            css={`bg-white stroke-black transition-all duration-500 ${
              !isOpen ? '-rotate-90' : 'rotate-90'
            }`}
          />
        </span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-sm mt-2"
      >
        <p>
          Anyone with this link can view your recall. Please ensure you share it
          only with trusted individuals.
        </p>
      </motion.div>
    </div>
  )
}
