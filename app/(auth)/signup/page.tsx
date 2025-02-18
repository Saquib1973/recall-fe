'use client'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/Store'
import { motion } from 'framer-motion'
const SignUpPage = () => {
  const { signupUser } = useAuth()
  const router = useRouter()
  const [data, setData] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous error
    setSuccess(null) // Clear previous success message

    const result = await signupUser(data)
    if (result.success) {
      setSuccess('Account created successfully! Redirecting...')
      setTimeout(() => {
        router.push('/signin')
      }, 1500)
    } else {
      if (result.message) setError(result?.message)
      else setError('Something went wrong. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2 w-full"
    >
      <h1 className="text-3xl border-y w-full py-6 tracking-wider pl-6 font-bold">
        Sign Up
      </h1>
      <div className="max-w-md w-full mx-auto flex flex-col mt-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-offblack"
            >
              Username
            </label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your unique username"
              value={data.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-offblack"
            >
              Password
            </label>
            <Input
              type="password"
              name="password"
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
          {success && (
            <p className="text-green-500 bg-green-50 p-2 rounded-md text-sm">
              {success}
            </p>
          )}
          <div className="flex justify-end">
            <Button text="Sign Up" size="sm" />
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-offblack font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUpPage
