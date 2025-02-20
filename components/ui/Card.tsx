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
import DeleteModal from './Modal'
import { AnimatePresence } from 'framer-motion';
import Modal from './Modal'
import { useRouter } from 'next/navigation'

const cardBgArr = [
  'bg-red-50 text-red-800',
  'bg-blue-50 text-blue-800',
  'bg-green-50 text-green-800',
  'bg-yellow-50 text-yellow-800',
  'bg-pink-50 text-pink-800',
  'bg-purple-50 text-purple-800',
  'bg-indigo-50 text-indigo-800',
  'bg-gray-50 text-gray-800',
  'bg-cyan-50 text-cyan-800',
  'bg-rose-50 text-rose-800',
  'bg-emerald-50 text-emerald-800',
  'bg-violet-50 text-violet-800',
  'bg-sky-50 text-sky-800',
  'bg-amber-50 text-amber-800',
  'bg-lime-50 text-lime-800',
  'bg-orange-50 text-orange-800',
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
  const router = useRouter()

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <Modal
            description="Are you sure you want to delete this content"
            key="delete-modal"
            open={open}
            onClose={onClose}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.6,
          delay: (index ?? 0) * 0.1,
        }}
        className={`break-inside-avoid relative max-h-[800px] cursor-pointer h-fit rounded-3xl gap-3 flex flex-col ${currentBg}  text-black`}
        onClick={()=>router.push('/recall/'+id)}
      >
        <div className="md:p-3 p-4 ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">{renderIcon()}</div>
            <button
              className="flex gap-1 items-center bg-red-500 md:bg-white pl-1  pr-2 rounded-full p-0.5 hover:bg-red-500 transition group"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(e)
              }}
            >
              <Delete size="md" />
              <p className="text-black max-md:text-white group-hover:text-white transition">Delete</p>
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
    </>
  )
}

export default Card
