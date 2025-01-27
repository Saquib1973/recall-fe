'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/Store'
import LoadingContent from './LoadingContent'
import type { AuthWrapperProps } from '.'


const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter()
  const { token, loading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!loading && !token) {
      router.push('/')
    }
  }, [loading, token, router])

  if (loading) {
    return <LoadingContent />
  }

  return token ? <>{children}</> : null
}

export default AuthWrapper
