'use client'
import { useContent } from '@/store/Store'
import {
  getInstagramURL,
  getPinterestURL,
  getTwitterURL,
  getYoutubeURL,
} from '@/utils/helper'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import type { CardProps } from '.'
import Delete from '../icons/Delete'
import Note from '../icons/Note'
import Pinterest from '../icons/Pinterest'
import Twitter from '../icons/Twitter'
import Youtube from '../icons/Youtube'
import DeleteModal from './DeleteModal'
import { AnimatePresence } from 'framer-motion';

const cardBgArr = [
  'bg-red-50 text-red-900',
  'bg-blue-50 text-blue-900',
  'bg-green-50 text-green-900',
  'bg-yellow-50 text-yellow-900',
  'bg-pink-50 text-pink-900',
  'bg-purple-50 text-purple-900',
  'bg-indigo-50 text-indigo-900',
  'bg-gray-50 text-gray-900',
  'bg-cyan-50 text-cyan-900',
  'bg-rose-50 text-rose-900',
  'bg-emerald-50 text-emerald-900',
  'bg-violet-50 text-violet-900',
  'bg-sky-50 text-sky-900',
  'bg-amber-50 text-amber-900',
  'bg-lime-50 text-lime-900',
  'bg-orange-50 text-orange-900',
]

const Card = ({
  index,
  user,
  tags,
  id,
  title,
  link,
  type,
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non obcaecati deleniti deserunt ducimus nemo delectus, rem quidem reprehenderit aperiam laudantium.',
}: CardProps) => {
  const [currentBg, setCurrentBg] = useState('bg-offwhite/10')
  const { deleteContent } = useContent()
  const [open, setOpen] = useState(false);
  console.log(tags)

  useEffect(() => {
    setCurrentBg(cardBgArr[Math.floor(Math.random() * cardBgArr.length)])
  }, [])

  // Load Instagram embed script dynamically
  useEffect(() => {
    if (type === 'instagram') {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    } else if (type === 'twitter') {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script);
      }
    }
  }, [type])

  const renderIcon = () => {
    switch (type) {
      case 'twitter':
        return (
          <>
            <Twitter size="md" />
            <p>Twitter</p>
          </>
        )
      case 'youtube':
        return (
          <>
            <Youtube size="md" />
            <p>Youtube</p>
          </>
        )
      case 'pinterest':
        return (
          <>
            <Pinterest size="md" />
            <p>Pinterest</p>
          </>
        )
      case 'instagram':
        return (
          <>
            <Pinterest size="md" />
            <p>Instagram</p>
          </>
        )
      default:
        return (
          <>
            <Note size="md" />
            <p>Others</p>
          </>
        )
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteContent(id) // Perform the deletion
  }

  const onClose = () => {
    setOpen(false)
  }

  const renderContent = () => {
    switch (type) {
      case 'twitter':
        return (
          <blockquote className="twitter-tweet">
            <a href={getTwitterURL(link)}></a>
          </blockquote>
        )
      case 'youtube':
        return (
          <iframe
            className="aspect-video w-full rounded-lg"
            src={getYoutubeURL(link)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )
      case 'pinterest':
        return (
          <iframe
            className="mx-auto w-full"
            src={getPinterestURL(link)}
            height="445"
            scrolling="no"
          ></iframe>
        )
      case 'instagram':
        return (
          <blockquote
            className="instagram-media max-w-min aspect-video"
            data-instgrm-version="13"
          >
            <a href={getInstagramURL(link)}></a>
          </blockquote>
        )
      default:
        return <></>
    }
  }
  console.log(index)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 50,
        duration: 0.7,
        delay: 0.05 * (index ?? 0), // Use 0.1 or 0.2 for a more noticeable delay
      }}
      className={`break-inside-avoid max-h-[800px]  h-fit rounded-3xl gap-3 flex flex-col ${currentBg} text-black`}
    >
      <AnimatePresence>
        {open && (
          <DeleteModal
            key="delete-modal"
            open={open}
            onClose={onClose}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
      <div className="md:p-3 p-4 ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">{renderIcon()}</div>
          <button className="flex items-center" onClick={handleDelete}>
            <Delete size="md" />
          </button>
        </div>
        <p className="text-2xl my-2 capitalize font-semibold tracking-tight leading-tight">
          {title}
        </p>
        <div className="flex mb-2 flex-wrap gap-1 py-0.5">
          {tags?.map((curr, index) => (
            <span
            key={index}
            className="text-xs bg-white border text-offblack px-2 py-0.5 rounded-lg"
            >
              {/* @ts-ignore */}
              {curr.tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 leading-[18px]">
          {description}
        </div>
      </div>
      <div className="w-full flex justify-center items-center overflow-hidden px-0.5 ">
        {renderContent()}
      </div>
    </motion.div>
  )
}

export default Card
