import Link from 'next/link'
import LogoInitial from '../icons/LogoInitial'

export function Footer() {
  return (
    <div className='w-full pt-4'>
      <footer className="max-w-6xl mx-auto px-4 p-2 dark:text-white-2">
        <div className="flex flex-row flex-wrap items-center justify-center space-y-3 gap-6 text-center md:justify-between">
            <LogoInitial/>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <Link
              href={'/'}
              className="font-normal"
            >
              About Us
            </Link>
            <Link
              href={'/'}
              className="font-normal"
            >
              License
            </Link>
            <Link
              href={'/'}
              className="font-normal"
            >
              Contribute
            </Link>
            <Link
              href={'/'}
              className="font-normal"
            >
              Contact Us
            </Link>
          </ul>
        </div>
        <hr className="my-3 border-white-2 dark:border-black-3" />
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
