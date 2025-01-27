import React from 'react'
import Button from './Button'
import type { DeleteModalProps } from '.';
import { motion } from 'framer-motion'
const DeleteModal = ({onClose,onConfirm}:DeleteModalProps) => {

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-offblack/80 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="bg-white w-[400px] max-md:p-4 p-8 relative rounded-lg flex flex-col gap-2"
        >
          <h1 className="text-xl font-semibold">
            Are you sure you want to delete this content
          </h1>
          <div className="flex gap-2 justify-end">
            <Button
              text="Yes"
              variant="secondary"
              css="bg-red-400 text-white border-none"
              onClick={() => {
                onConfirm()
                onClose()
              }}
              size="md"
            />
            <Button text="No" variant="secondary" onClick={onClose} size="md" />
          </div>
        </div>
      </motion.div>
    )
}

export default DeleteModal
