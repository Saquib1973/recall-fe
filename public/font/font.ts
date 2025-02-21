import { Quicksand, Mali } from 'next/font/google'

export const quicksand = Quicksand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-quicksand',
})

export const mali = Mali({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mali',
})

