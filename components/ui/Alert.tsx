'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type AlertPropsType = {
  message: string
  type: 'success' | 'error' | 'warning'
  onClose?: () => void
}

const Alert = ({ message, type, onClose }: AlertPropsType) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose && onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!visible) return null

  const alertStyles = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-5 right-2 transform px-6 py-3 border rounded-md shadow-md ${alertStyles[type]}`}
    >
      {message}
    </motion.div>
  )
}

export default Alert
