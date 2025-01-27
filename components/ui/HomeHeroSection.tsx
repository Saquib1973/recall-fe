'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'

const HomeHeroSection = () => {
  const imageContainerVariants = {
    hidden: { opacity: 0,y:20 },
    visible: {
      opacity: 1,
      y:0,
      transition: {
        duration: 0.5,
      },
    }
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 ,  },
  }

  return (
    <div className="max-w-screen-xl min-h-[86vh] mt-4 md:mt-14 px-8 xl:px-12 mx-auto">
      <div className="flex max-md:flex-col-reverse items-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-start"
        >
          <motion.h1
            variants={childVariants}
            className="text-3xl lg:text-4xl xl:text-5xl font-medium leading-normal"
          >
            Organize Your Digital World.
          </motion.h1>

          <motion.p variants={childVariants} className="mt-4 mb-6">
            Links, Notes, and Ideas, All in One Place. Simplify your life by
            keeping all your links and notes in one secure, user-friendly app.
            Get Started
          </motion.p>

          <motion.div variants={childVariants}>
            <Link href="/dashboard">
              <Button text={'Get Started'} css="max-md:w-[400px]" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={imageContainerVariants}
          initial="hidden"
          animate="visible"
          className="md:ml-10 md:w-[500px] w-[300px] h-[400px] md:h-[600px]"
        >
          <Image
            src="https://i.pinimg.com/736x/de/99/80/de9980f559e809137bbf96585c732777.jpg"
            alt="VPN Illustrasi"
            width={612}
            height={383}
            className="mix-blend-multiply object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default HomeHeroSection
