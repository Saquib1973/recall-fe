"use client"
import React from 'react'
import Button from './Button'
import type { ModalProps } from '.';
import { AnimatePresence, motion } from 'framer-motion'
const Modal = ({onClose,onConfirm,description,confirmText="Yes",cancelText="No",open}:ModalProps) => {

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black-1/90 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="bg-white-1 border border-white-3 dark:bg-black-2 max-w-[400px] text-black-2 dark:border-black-3 dark:text-white-1 max-md:p-4 p-8 relative rounded-lg flex flex-col gap-2"
          >
            <h1 className="text-xl font-semibold">{description}</h1>
            <div className="flex gap-2 pt-4 justify-end">
              <Button
                text={confirmText}
                variant="tertiary"
                css=""
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                size="md"
              />
              <Button
                text={cancelText}
                variant="secondary"
                onClick={onClose}
                size="md"
              />
            </div>
          </div>
        </motion.div>
      )}

    </AnimatePresence>
  )
}

export default Modal
