'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  texts: string[]
}

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: 'linear',
      times: [0, 0.5, 0.5, 1],
    },
  },
}

export default function TypewriterText({ texts }: TypewriterTextProps) {
  const textIndex = useMotionValue(0)
  const count = useMotionValue(0)
  const updatedThisRound = useMotionValue(true)
  const [displayText, setDisplayText] = useState('')

  const currentText = useTransform(textIndex, (latest) => texts[latest] || '')
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const maxLength = Math.max(...texts.map((text) => text.length))

    const controls = animate(count, maxLength, {
      type: 'tween',
      duration: 10, // Slower typing speed
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 2,
      onUpdate(latest) {
        const currentLength = Math.round(latest)
        const currentTextValue = currentText.get()
        setDisplayText(currentTextValue.slice(0, currentLength))

        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false)
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0)
          } else {
            textIndex.set(textIndex.get() + 1)
          }
          updatedThisRound.set(true)
        }
      },
    })

    return () => controls.stop()
  }, [count, textIndex, texts, updatedThisRound, currentText])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full select-none min-h-[10px] min-w-[10px] items-center justify-center"
    >
      <div className="flex flex-col p-2">
        <div className="inline text-5xl text-red-100 md:text-7xl font-bold">
          {displayText.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            variants={cursorVariants}
            animate="blinking"
            className="inline-block h-12 w-[4px] translate-y-1 bg-current ml-1"
          />
        </div>
      </div>
    </motion.div>
  )
}
