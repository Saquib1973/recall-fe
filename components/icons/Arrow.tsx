import React from 'react'
import { IconSizeVariants, type IconProps } from '.'

const Arrow = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${IconSizeVariants[props.size || 'md']} ${props.css} bg-white-2 text-black dark:bg-black-3 dark:text-white-2 cursor-pointer lg:-ml-4 p-0.5 md:p-1 rounded-full`}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  )
}

export default Arrow
