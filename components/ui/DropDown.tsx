"use client"
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Burger from '../icons/Burger';
import {AnimatePresence, motion} from "framer-motion"

export default function DropDown({setLogout}:{setLogout:()=>void}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center" ref={dropdownRef}>
      <div className="size-[35px]  md:h-[45px] flex gap-1 items-center md:w-[45px] ">
        <div
          onClick={toggleMenu}
          className="cursor-pointer border dark:border-black-3 border-white-3 flex items-center justify-center w-full h-full rounded-full"
        >
          <Burger css="" size="md" />
        </div>
          <AnimatePresence mode="wait">
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute mt-2 w-48 top-16 max-lg:top-14 right-4 rounded-md bg-white-1 dark:bg-black-2 dark:border-black-3 border border-white-2 shadow-lg dark:text-white-1 focus:outline-none"
            >
              <div className="rounded-md text-base p-2" onClick={toggleMenu}>
                <Link href={'/share'} className="dropdown-item">
                  Share Recall
                </Link>
                <Link href={'/user'} className="dropdown-item">
                  User Setting
                </Link>
                <button
                  onClick={() => setLogout()}
                  className="w-full text-left px-4 py-2 rounded-md bg-red-2 text-white-1"
                >
                  Logout
                </button>
              </div>
            </motion.div>
        )}
          </AnimatePresence>
      </div>
    </div>
  )
}
