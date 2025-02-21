'use client'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import { useDebounce } from '@/hooks'
import { useAuth } from '@/store/Store'
import { env } from '@/utils/config'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Close from '../icons/Close'
import Home from '../icons/Home'
import LogoInitial from '../icons/LogoInitial'
import Plus from '../icons/Plus'
import Button from './Button'
import DropDown from './DropDown'
import Loader from './Loader'
import Modal from './Modal'
import Share from '../icons/Share'

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
  const [isFocused, setIsFocused] = useState(false)

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
      setSearchResults([])
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
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white-1 dark:bg-black-1 text-black-1 dark:text-white-1 z-50 sticky top-0 left-0 w-full p-4 px-4 md:px-6 gap-2 items-center flex justify-between"
    >
      <Modal
        confirmText={'Logout'}
        description="Are you sure you want to logout"
        onClose={() => setOpen(false)}
        onConfirm={logoutUser}
        open={open}
      />
      <Link href={'/'} className="flex gap-2 md:gap-3 items-center">
        <LogoInitial />
      </Link>
      <div className="relative w-full mx-1 md:mx-2">
        <span className="flex">
          <span className="relative w-full">
            <input
              type="text"
              placeholder="Search for anything you saved"
              className="bg-white-2 dark:bg-black-2 z-20 px-5 pl-12 peer md:px-6 md:pl-12 p-2 md:p-3 outline-none rounded-3xl w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false)
                setSearchQuery('')
                setSearchResults([])
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-9 left-2 top-1/2 peer-focus:opacity-0 transition -translate-y-1/2 text-black-3/70 dark:text-white-3/70 rounded-full absolute"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>{' '}
          </span>
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
        {isFocused && (
          <div className="absolute -z-10 left-0 -top-0 rounded-3xl pt-[52px] dark:bg-black-2 bg-white-2 w-full max-lg:w-6xl p-2 ">
            <div className="flex gap-8 justify-center p-4 py-2">
              <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-full min-w-[40px] bg-white-3" />

              <button
                onMouseDown={() => {
                  router.push('/share')
                }}
                className="flex gap-2 items-center cursor-pointer"
                aria-label="Share your Recall"
              >
                <Share />
                Share your Recall
              </button>
            </div>
            {loading ? (
              <div className="absolute z-10 left-0 top-[52px] bg-white-2 dark:bg-black-2 text-center w-full p-4 ">
                <Loader />
              </div>
            ) : (
              searchResults.length > 0 && (
                <div className="absolute z-10 left-0 top-[52px] bg-white-2 dark:bg-black-2 w-full max-lg:w-6xl p-4 ">
                  {searchResults.map((result) => (
                    <div
                      key={result._id}
                      className="p-4 border-b border-white-3 dark:border-black-3 cursor-pointer"
                    >
                      <h3 className="font-bold">{result.title}</h3>
                      <p>{result.description}</p>
                      <div className="flex gap-2 mt-2">
                        {result.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-black-3 text-white px-2 py-1 rounded"
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
        )}
      </div>
      <div className="flex gap-2 md:gap-3 items-center">
        <Link href={'/dashboard'} className="max-md:hidden ">
          <Button
            variant={pathname === '/dashboard' ? 'primary' : 'secondary'}
            size="md"
            text="dashboard"
            startIcon={<Home />}
          />
        </Link>
        <Link href={'/create'} className="max-md:hidden">
          <Button
            text="Create"
            startIcon={<Plus />}
            variant={pathname === '/create' ? 'primary' : 'secondary'}
            size="md"
            onClick={() => {}}
          />
        </Link>

        <DarkModeToggle />
        <DropDown setLogout={() => setOpen(!open)} />
      </div>
    </motion.div>
  )
}

export default Header
