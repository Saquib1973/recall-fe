// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { mali, quicksand } from '@/public/font/font'
import ThemeProvider from '@/store/ThemeProvider'

export const metadata: Metadata = {
  title: 'Recall',
  description: 'Welcome to Recall',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${mali.variable} dark:bg-black-1 bg-white-1 transition ${quicksand.variable} font-quicksand antialiased`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
