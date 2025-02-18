import Link from 'next/link'
import Logo from '../icons/Logo'

export function Footer() {
  return (
    <div className='w-full pt-4'>
      <footer className="max-w-6xl mx-auto px-4 p-2">
        <div className="flex flex-row flex-wrap items-center justify-center space-y-3 gap-6 text-center md:justify-between">
          <Logo size="md" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <Link
              href={'/'}
              className="font-normal transition-colors hover:text-gray-500"
            >
              About Us
            </Link>
            <Link
              href={'/'}
              className="font-normal transition-colors hover:text-gray-500"
            >
              License
            </Link>
            <Link
              href={'/'}
              className="font-normal transition-colors hover:text-gray-500"
            >
              Contribute
            </Link>
            <Link
              href={'/'}
              className="font-normal transition-colors hover:text-gray-500"
            >
              Contact Us
            </Link>
          </ul>
        </div>
        <hr className="my-3 border-offblack/20" />
        <p color="blue-gray" className="text-center font-normal">
          Made with ❤️ by{' '}
          <Link
            href={'https://heysaquib.vercel.app/'}
            target="_blank"
            rel="noopener noreferrer"
            className="underline tracking-wide"
          >
            @saquibali
          </Link>
        </p>
      </footer>
    </div>
  )
}
