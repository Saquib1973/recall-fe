"use client"
import Link from 'next/link';
import { useState } from 'react';
import Burger from '../icons/Burger';

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex justify-center lg:hidden items-center">
      <div className="size-[35px] md:h-[45px] flex gap-1 items-center md:w-[45px] ">
        <Burger css='' size='lg' onClick={toggleMenu} />
        {isOpen && (
          <div className="absolute mt-2 w-48 top-14 right-4 rounded-md bg-white shadow-lg ring-1 ring-offwhite focus:outline-none">
            <div className="py-1" onClick={toggleMenu}>
              <Link href={'/'} className="dropdown-item">
                User
              </Link>
              <Link href={'/dashboard'} className="dropdown-item">
                Dashboard
              </Link>
              <button className="w-full hover:text-white text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-400">Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
