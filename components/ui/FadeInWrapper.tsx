'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
const FadeInWrapper = ({children}:{children:React.ReactElement}) => {
  return (
    <AnimatePresence mode="wait">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      {children}
    </motion.div>
    </AnimatePresence>
  )
}

export default FadeInWrapper
