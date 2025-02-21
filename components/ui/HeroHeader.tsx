'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useAuth } from '@/store/Store'
import Loader from './Loader'
import LogoInitial from '../icons/LogoInitial'
import DarkModeToggle from './DarkModeToggle'

const HeroHeader = () => {
  const { isAuthenticated, loading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="animation bg-white-1 dark:bg-black-1 text-black-1 dark:text-white-1 w-full flex items-center justify-between p-3">
        <LogoInitial />
        <Loader/>
      </div>
    )
  }

  return (
      <div className="animation bg-white-1 dark:bg-black-1 text-black-1 dark:text-white-1 w-full  flex items-center justify-between p-3">
        <LogoInitial />
        <div className="flex items-center w-fit gap-4">
          <div className="">
            <DarkModeToggle />
          </div>

          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button text="Dashboard" />
            </Link>
          ) : (
            <>
              <Link href={'/signin'}>
                <Button text="Signin" variant="secondary" size="md" />
              </Link>
              <Link href={'/signup'}>
                <Button
                  text="Signup"
                  variant="tertiary"
                  size="md"
                  css="border"
                />
              </Link>
            </>
          )}
        </div>
      </div>
  )
}

export default HeroHeader
