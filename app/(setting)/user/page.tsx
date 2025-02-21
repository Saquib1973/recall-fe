"use client"
import FadeInWrapper from '@/components/ui/FadeInWrapper'
import { useSetTheme, useTheme } from '@/store/themeStore'

const page = () => {
    const setTheme = useSetTheme()
  return (
    <FadeInWrapper>
      <div>
        <div className="flex gap-2 items-center">
          <button className="dark:bg-black-2 dark:text-white-2 bg-white-2 p-2 px-5 rounded-full" onClick={setTheme}>Switch Theme</button>
        </div>
      </div>
    </FadeInWrapper>
  )
}

export default page
