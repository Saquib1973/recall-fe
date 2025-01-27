'use client'
import React, { useEffect } from 'react'
import Logo from '../icons/Logo'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useAuth } from '@/store/Store'
import Loader from './Loader'

const HeroHeader = () => {
  const { isAuthenticated, loading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="flex items-center justify-between p-3 max-w-6xl mx-auto">
        <Logo size="lg" />
        <Loader/>

          {/* <Button text='Wait' css='w-20' /> */}
      </div>
    )
  }

  return (
    <div className='backdrop-blur-xl bg-white'>
      <div className="flex items-center justify-between p-3 max-w-6xl mx-auto">
        <Logo size="lg" />
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button text="Dashboard" />
              </Link>
            </>
          ) : (
            <>
              <Link href={'/signup'}>
                <Button
                  text="Signup"
                  variant="secondary"
                  size="md"
                  css="border"
                />
              </Link>
              <Link href={'/signin'}>
                <Button text="Signin" variant="primary" size="md" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroHeader
