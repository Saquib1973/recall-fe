'use client'
import React from 'react'
import Button from './Button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from '../icons/Logo'
import Plus from '../icons/Plus'
import DropDown from './DropDown'
import { useAuth } from '@/store/Store'
import Power from '../icons/Power'
import {motion} from 'framer-motion'
import Share from '../icons/Share'
import Home from '../icons/Home'
const Header = () => {
  const pathname = usePathname()
  const { logoutUser } = useAuth()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white z-50 sticky top-0 left-0 w-full p-4 px-4 md:px-6 gap-2 items-center flex justify-between"
    >
      <Link href={'/'} className="flex gap-3 items-center">
        <Logo />
      </Link>
      <input
        type="text"
        placeholder="Search for anything you saved"
        className="bg-offwhite px-5 md:px-6 p-2 md:p-3 outline-none rounded-3xl w-full mx-2 md:mx-6"
      />

      <div className="flex gap-3 items-center">
        <Link href={'/dashboard'} className="">
          <Button
            variant={pathname === '/dashboard' ? 'primary' : 'secondary'}
            size="md"
            text="dashboard"
            startIcon={<Home/>}
          />
        </Link>
        {/* <Link href={'/'} className="max-lg:hidden">
          <Button variant="secondary" css="border" size="md" text="explore" />
        </Link> */}
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
          onClick={() => alert('Still Buuilding 🛠️')}
          endIcon={<Share />}
          css=""
        />
        <DropDown />
        <button
          className="bg-red-500 max-lg:hidden rounded-full lg:p-3 p-2 text-white"
          onClick={logoutUser}
        >
          <Power />
        </button>
      </div>
    </motion.div>
  )
}

export default Header
