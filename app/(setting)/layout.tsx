'use client'

import Arrow from '@/components/icons/Arrow'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import FadeInWrapper from '@/components/ui/FadeInWrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex text-black-1 dark:text-white-1 flex-col min-h-screen max-w-4xl mx-auto p-4 md:p-10">
      {/* Mobile Top Bar (Tabs) */}
      <FadeInWrapper>

      <div className=" flex justify-between items-center w-full mb-4 md:mb-16">
        <div className="flex items-center gap-4">
          <Arrow onClick={() => router.back()} css="" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>
      </FadeInWrapper>

      {/* Mobile Tabs */}
      <FadeInWrapper>

      <div className="md:hidden flex w-full justify-center border-b border-black-3 dark:border-white-3 mb-4">
        <Link
          className={`w-1/2 text-center py-2 ${
            pathname.includes('share')
            ? 'border-b-2 border-black-3 dark:border-white-3 font-medium'
            : 'dark:text-white-3 text-black-3'
            }`}
            href={'/share'}
            >
          Share Recall
        </Link>
        <Link
          className={`w-1/2 text-center py-2 ${
            pathname.includes('user')
            ? 'border-b-2 border-black-3 dark:border-white-3 font-medium'
            : 'dark:text-white-3 text-black-3'
            }`}
            href={'/user'}
            >
          User Settings
        </Link>
      </div>
          </FadeInWrapper>

      <div className="flex w-full">
        <div className="hidden md:flex flex-col min-w-40 border-r h-fit pb-6  pr-4">
          <nav className="flex flex-col gap-1">
            <Link
              className={`p-2 px-4 rounded-md text-right ${
                pathname.includes('share') ? 'bg-white-2 text-black-1 dark:text-white-2 dark:bg-black-2  font-medium' : ''
              }`}
              href={'/share'}
            >
              Share Recall
            </Link>
            <Link
              className={`p-2 px-4 rounded-md text-right ${
                pathname.includes('user') ? 'bg-white-2 text-black-1 dark:text-white-2 dark:bg-black-2  font-medium' : ''
              }`}
              href={'/user'}
            >
              User Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex px-2 md:px-10">
          {children}
        </div>
      </div>
    </div>
  )
}
