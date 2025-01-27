import AuthWrapper from '@/components/ui/AuthWrapper'
import Header from '@/components/ui/Header'

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col">
      <Header />
      <AuthWrapper>{children}</AuthWrapper>
    </div>
  )
}
export default RootLayout
