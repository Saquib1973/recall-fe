'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
const FadeInWrapper = ({children}:{children:React.ReactElement}) => {
  return (
    <AnimatePresence>

      <motion.div

      >
      {children}
    </motion.div>
    </AnimatePresence>
  )
}

export default FadeInWrapper
