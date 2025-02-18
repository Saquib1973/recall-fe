"use client"
import React from 'react'
import Button from './Button'
import type { ModalProps } from '.';
import { motion } from 'framer-motion'
const Modal = ({onClose,onConfirm,description,confirmText="Yes",cancelText="No"}:ModalProps) => {

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
          className="bg-white max-w-[400px] text-black max-md:p-4 p-8 relative rounded-lg flex flex-col gap-2"
        >
          <h1 className="text-xl font-semibold">
            {description}
          </h1>
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
            <Button text={cancelText} variant="secondary" onClick={onClose} size="md" />
          </div>
        </div>
      </motion.div>
    )
}

export default Modal
