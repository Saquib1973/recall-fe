'use client'
import Loader from '@/components/ui/Loader'
import DarkModeToggle from './../../components/ui/DarkModeToggle'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import LoadingContent from '@/components/ui/LoadingContent'

const Page = () => {
  return (
    <div className="flex flex-col max-w-6xl mx-auto bg-white-1 gap-4 min-h-screen dark:bg-black-1 dark:text-white p-10">
      <div className="flex flex-col gap-2">
        <h1 className="h1-quicksand text-5xl">Miscilineous</h1>
        <div className="flex gap-8 items-center">
          <p>Loader</p>
          <span>
            <Loader />
          </span>
        </div>
        {/* <div className="flex gap-8 items-center">
          <p>Loading Content</p>
          <span>
            <LoadingContent message="Loading..." />
          </span>
        </div> */}
        <div className="flex gap-8 items-center">
          <p>Theme</p>
          <span>
      <DarkModeToggle />
          </span>
        </div>
        <div className="flex gap-8 items-center">
          <p>Input</p>
          <span>
            <Input placeholder="Enter your name" />
          </span>
        </div>
        <div className="flex gap-8 items-center">
          <p>Text Area</p>
          <span>
            <TextArea placeholder="Enter your name" />
          </span>
        </div>
      </div>
      <div>
        <h1 className="text-5xl">Colors</h1>
        <div className="flex flex-wrap gap-2">
          <div className="w-10 h-10 bg-white-1"></div>
          <div className="w-10 h-10 bg-white-2"></div>
          <div className="w-10 h-10 bg-white-3"></div>
          <div className="w-10 h-10 bg-red-1"></div>
          <div className="w-10 h-10 bg-red-2"></div>
          <div className="w-10 h-10 bg-red-3"></div>
          <div className="w-10 h-10 bg-black-1"></div>
          <div className="w-10 h-10 bg-black-2"></div>
          <div className="w-10 h-10 bg-black-3"></div>
        </div>
      </div>
      <div>
        <h1 className="text-5xl">Text</h1>
        <div className="flex flex-col gap-2">
          <p className="h1-quicksand">h1 quicksand</p>
          <p className="h1-mali">h1 mali</p>
          <p className="h2-quicksand">h2 quicksand</p>
          <p className="h2-mali">h2 mali</p>
          <p className="p-quicksand">p quicksand</p>
          <p className="p-mali">p mali</p>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-2">
        <h1 className="text-5xl">Button</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" text="Primary Button" />
          <Button variant="secondary" text="Secondary Button" />
          <Button variant="tertiary" text="Tertiary Button" />
        </div>
      </div>
    </div>
  )
}

export default Page
