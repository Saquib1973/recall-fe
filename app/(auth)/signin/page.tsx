'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Loader from '@/components/ui/Loader'
import { useAuth } from '@/store/Store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FadeInWrapper from "@/components/ui/FadeInWrapper"

const SignInPage = () => {
  const [loading, setLoading] = useState(false)
  const { token, loginUser } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent,
    data: { email: string; password: string }
  ) => {
    e.preventDefault()
    setLoading(true)
    const loggedIn = await loginUser(data)
    if (!loggedIn.success && loggedIn.message) setError(loggedIn?.message)
    if (loggedIn.success) {
      router.push('/')
    }
    setLoading(false)
  }
  const testCredential = {
    email: 'saquib',
    password: 'saquib',
  }
  return (
    <FadeInWrapper>
      <div className="flex flex-col gap-2 w-full py-2">
        <h1 className="text-3xl border-y w-full py-6 md:text-center dark:border-black-3 dark:text-white-3 text-black-3 border-white-3 tracking-wider pl-6 font-bold">
          Sign In
        </h1>
        <div className="max-w-md w-full mx-auto flex flex-col mt-10">
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, data)}>
            <div>
              <Input
                label="email"
                type="text"
                name="email"
                placeholder="Enter your Unique Username"
                value={data.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                label="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
            {error && (
              <p className="bg-red-50 p-2 rounded-md text-red-500 text-sm">
                {error}
              </p>
            )}
            <div className="flex justify-end gap-2">
              {loading ? (
                <div className="w-full text-center">
                  <Loader />
                </div>
              ) : (
                <>
                  <button
                    onClick={async (e) => {
                      handleSubmit(e, testCredential)
                      return
                    }}
                  >
                    <Button
                      text="Test Credentials"
                      variant="secondary"
                      size="sm"
                    />
                  </button>
                  <Button text="Sign In" size="sm" />
                </>
              )}
            </div>
          </form>
          <p className="mt-4 text-black-2 dark:text-white-2 text-center">
            {`Don't have an account? `}
            <Link
              href="/signup"
              className="text-black-1 dark:text-white-1  underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </FadeInWrapper>
  )
}

export default SignInPage
