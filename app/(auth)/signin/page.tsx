'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/store/Store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
const SignInPage = () => {
  const { token, loginUser } = useAuth()
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
    const loggedIn = await loginUser(data)
    if (loggedIn) {
      router.push('/')
    }
    console.log('logged in ? ', loggedIn)
  }
  const testCredential = {
    email: 'saquib',
    password: 'saquib',
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2"
    >
      <h1 className="text-3xl tracking-wider text-center mb-8 font-bold my-4">
        Sign In
      </h1>
      <form className="space-y-4" onSubmit={(e) => handleSubmit(e, data)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-offblack"
          >
            Email
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Enter your Unique Username"
            value={data.email}
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
        <div className="flex justify-end gap-2">
          <button
            onClick={async (e) => {
              handleSubmit(e, testCredential)
              return
            }}
          >
            <Button text="Test Credentials" variant="secondary" size="sm" />
          </button>
          <Button text="Sign In" size="sm" />
        </div>
      </form>
      <p className="mt-4 text-center">
        {`Don't have an account? `}
        <Link href="/signup" className="text-offblack underline font-medium">
          Sign Up
        </Link>
      </p>
    </motion.div>
  )
}

export default SignInPage
