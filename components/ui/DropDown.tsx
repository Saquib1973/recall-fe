"use client"
import Link from 'next/link';
import { useState } from 'react';
import Burger from '../icons/Burger';
import {AnimatePresence, motion} from "framer-motion"
export default function DropDown({setLogout}:{setLogout:()=>void}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="size-[35px]  md:h-[45px] flex gap-1 items-center md:w-[45px] ">
        <div
          onClick={toggleMenu}
          className="cursor-pointer border flex items-center justify-center w-full h-full rounded-full"
        >
          <Burger css="" size="md" />
        </div>
        {isOpen && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-2 w-48 top-16 max-lg:top-14 right-4 rounded-md bg-white shadow-lg ring-1 ring-offwhite focus:outline-none"
            >
              <div className="py-1" onClick={toggleMenu}>
                <Link href={'/share'} className="dropdown-item">
                  Share your recall
                </Link>
                <Link href={'/user'} className="dropdown-item">
                  User settings
                </Link>
                <button
                  onClick={() => setLogout()}
                  className="w-full hover:text-white text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-400"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
