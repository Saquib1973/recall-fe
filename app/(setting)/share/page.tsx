'use client'
import FadeInWrapper from '@/components/ui/FadeInWrapper'
import { useContent } from '@/store/Store'
import type { ShareStatusResoponseType } from '@/store/type'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
// import { FaWhatsapp, FaTwitter } from 'react-icons/fa'
import PrivacyNotice from './../../../components/ui/PrivacyNotice';

export default function Page() {
  const [toggle, setToggle] = useState<boolean>(false)
  const { shareRecall, getShareStatus, sharedLink } = useContent()
  const [data, setData] = useState<ShareStatusResoponseType | null>(null)

  useEffect(() => {
    async function fetchStatus() {
      const response = await getShareStatus()
      setData(response)
    }
    fetchStatus()
  }, [])

  useEffect(() => {
    setToggle(!!data?.link?.hash)
  }, [data])

  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    if (!sharedLink) return

    navigator.clipboard.writeText(sharedLink)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  // Generate WhatsApp & Twitter share links
  const encodedLink = encodeURIComponent(sharedLink ?? '')
  const whatsappShare = `https://wa.me/?text=${encodedLink}`
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedLink}&text=Check%20out%20this%20recall!`

  return (
    <FadeInWrapper>
      <div className="flex flex-col gap-3 justify-start items-start">
        <div className="flex gap-4 p-1">
          <div className="flex gap-4 items-center">
            <p className="">Share your recall</p>
            <label className="relative inline-block w-10 h-6">
              <input
                type="checkbox"
                className="hidden"
                checked={toggle}
                onChange={() => {
                  setToggle(!toggle)
                  shareRecall(!toggle)
                }}
              />
              <span
                className={`absolute inset-0 cursor-pointer transition-all duration-300 ${
                  toggle ? 'bg-black' : 'bg-gray-200'
                } rounded-full`}
              ></span>
              <span
                className={`absolute left-1 bottom-1 bg-white w-4 h-4 transition-all duration-300 rounded-full shadow-md ${
                  toggle ? 'translate-x-4' : ''
                }`}
              ></span>
            </label>
          </div>

          {sharedLink && (
            <div className="flex items-center gap-3">
              {/* Copy Link */}
              <span
                onClick={handleCopy}
                className="bg-gray-50 px-3 p-1 shadow-inner pr-1 w-fit flex justify-between gap-3 rounded-full cursor-pointer"
              >
                {sharedLink}
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-100 text-green-700 shadow-inner rounded-full p-0.5 px-2 text-sm"
                    >
                      Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-200 shadow-inner cursor-pointer rounded-full p-0.5 px-2 text-sm"
                    >
                      Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </div>
          )}
        </div>

        {sharedLink && (
          <div className='gap-2 p-1 flex items-center'>
            Share on
            <Link
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-full px-4 p-2 bg-green-50 hover:bg-green-100 transition-all text-green-600"
            >
              Whatsapp
            </Link>

            <Link
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-full px-4 p-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all"
            >
              Twitter
            </Link>
          </div>
        )}

        <PrivacyNotice />
      </div>
    </FadeInWrapper>
  )
}
