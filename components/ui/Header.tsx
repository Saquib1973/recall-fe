'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from '../icons/Logo'
import Plus from '../icons/Plus'
import DropDown from './DropDown'
import { useAuth } from '@/store/Store'
import Power from '../icons/Power'
import { motion } from 'framer-motion'
import Share from '../icons/Share'
import Home from '../icons/Home'
import { env } from '@/utils/config'
import { useDebounce } from '@/hooks'
import Close from '../icons/Close'
import Loader from './Loader'
import Modal from './Modal'

type Result = {
  _id: string
  title: string
  link: string
  description: string
  type: string
  tags: { tag: string }[]
}

const Header = () => {
  const pathname = usePathname()
  const { logoutUser } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Result[]>([])
  const debounceQuery = useDebounce(searchQuery, 2000)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    if (searchQuery.length > 2) {
      try {
        const response = await fetch(
          `${env.BACKEND_URL}/content/search?q=${searchQuery}`
        )
        const data = await response.json()
        setSearchResults(data.results)
      } catch (error) {
        console.error('Error searching:', error)
      }
    } else {
      setSearchResults([]) // Clear results when input is empty
    }
    setLoading(false)
  }

  useEffect(() => {
    handleSearch()
  }, [debounceQuery])

  // Clear search results on ESC key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('')
      setSearchResults([])
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white z-50 sticky top-0 left-0 w-full p-4 px-4 md:px-6 gap-2 items-center flex justify-between"
    >
      {open && (
        <Modal
        confirmText={"Logout"}

          description="Are you sure you want to logout"
          onClose={() => setOpen(false)}
          onConfirm={logoutUser}
        />
      )}
      <Link href={'/'} className="flex gap-3 max-sm:hidden items-center">
        <Logo />
      </Link>
      <div className="relative w-full mx-2 md:mx-6">
        <span className="flex">
          <input
            type="text"
            placeholder="Search for anything you saved"
            className="bg-offwhite z-20 px-5 md:px-6 p-2 md:p-3 outline-none rounded-3xl w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          {searchQuery && (
            <Close
              onClick={() => {
                setSearchQuery('')
                setSearchResults([])
              }}
              css="absolute cursor-pointer z-20 right-4 top-0.5 translate-y-1/2"
            />
          )}
        </span>
        {loading ? (
          <div className="absolute z-10 left-0 top-[52px] bg-white text-center w-full p-4 ">
            <Loader />
          </div>
        ) : (
          searchResults.length > 0 && (
            <div className="absolute z-10 left-0 top-[52px] bg-white w-full max-lg:w-6xl p-4 ">
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  <h3 className="font-bold">{result.title}</h3>
                  <p>{result.description}</p>
                  <div className="flex gap-2 mt-2">
                    {result.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        {tag.tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div className="flex gap-3 items-center">
        <Link href={'/dashboard'} className="">
          <Button
            variant={pathname === '/dashboard' ? 'primary' : 'secondary'}
            size="md"
            text="dashboard"
            startIcon={<Home />}
          />
        </Link>
        <Link href={'/create'}>
          <Button
            text="Create"
            startIcon={<Plus />}
            variant={pathname === '/create' ? 'primary' : 'secondary'}
            size="md"
            css="border"
            onClick={() => {}}
          />
        </Link>
        <Button
          text="Share"
          variant="secondary"
          onClick={() => alert('Still Building 🛠️')}
          endIcon={<Share />}
          css=""
        />
        <DropDown />
        <button
          className="bg-red-500 max-lg:hidden rounded-full lg:p-3 p-2 text-white"
          onClick={() => setOpen(true)}
        >
          <Power />
        </button>
      </div>
    </motion.div>
  )
}

export default Header
