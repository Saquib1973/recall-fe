'use client'

import Arrow from '@/components/icons/Arrow'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import FadeInWrapper from '@/components/ui/FadeInWrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto p-4 md:p-10">
      {/* Mobile Top Bar (Tabs) */}
      <FadeInWrapper>

      <div className="md:hidden flex justify-between items-center w-full mb-4">
        <div className="flex items-center gap-4">
          <Arrow onClick={() => router.back()} css="" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>
      </FadeInWrapper>

      {/* Mobile Tabs */}
      <FadeInWrapper>

      <div className="md:hidden flex w-full justify-center border-b border-gray-300 mb-4">
        <Link
          className={`w-1/2 text-center py-2 ${
            pathname.includes('share')
            ? 'border-b-2 border-black font-medium'
            : 'text-gray-500'
            }`}
            href={'/share'}
            >
          Share Recall
        </Link>
        <Link
          className={`w-1/2 text-center py-2 ${
            pathname.includes('user')
            ? 'border-b-2 border-black font-medium'
            : 'text-gray-500'
            }`}
            href={'/user'}
            >
          User Settings
        </Link>
      </div>
          </FadeInWrapper>

      <div className="flex w-full">
        <div className="hidden md:flex flex-col min-w-40 border-r h-fit pb-6 border-gray-200 pr-4">
          <div className="flex items-center gap-4 mb-6">
            <Arrow onClick={() => router.back()} css="" />
            <h1 className="text-xl md:text-2xl font-semibold">Settings</h1>
          </div>

          <nav className="flex flex-col gap-1">
            <Link
              className={`p-2 px-4 rounded-md text-right hover:bg-gray-100 ${
                pathname.includes('share') ? 'bg-gray-100 font-medium' : ''
              }`}
              href={'/share'}
            >
              Share Recall
            </Link>
            <Link
              className={`p-2 px-4 rounded-md text-right hover:bg-gray-100 ${
                pathname.includes('user') ? 'bg-gray-100 font-medium' : ''
              }`}
              href={'/user'}
            >
              User Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex p-8 md:px-10">
          {children}
        </div>
      </div>
    </div>
  )
}
