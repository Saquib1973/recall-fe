'use client'

import React from 'react'
import type { ButtonProps } from '.'

const buttonStyles = {
  primary:
    'border-transparent bg-black-1 text-white-1 dark:bg-white-1 dark:text-black-1 ',
  secondary: 'bg-white-1 text-black-1 border- dark:bg-black-1 dark:text-white-1',
  tertiary: 'border-transparent bg-red-2 text-white-1',
}
const sizeStyles = {
  sm: 'px-3 py-2 text-sm font-light',
  md: 'lg:px-5 lg:py-3 px-2 sm:px-4 py-2 text-sm sm:text-base',
  lg: 'px-2 py-1 md:px-6 md:py-3 text-base md:text-lg font-semibold',
}
const globalStyles =
  'border dark:border-black-3 border-white-3 capitalize rounded-full tracking-wider flex gap-2 items-center justify-center'

const Button = ({
  variant = 'primary',
  size = 'md',
  text,
  startIcon,
  endIcon,
  css,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
      <button
        className={`flex ${buttonStyles[variant]}  ${sizeStyles[size]} ${globalStyles} ${css} `}
        onClick={onClick}
        {...rest}
      >
        {startIcon}
        <span className={!text ? "hidden" : startIcon || endIcon ? 'max-lg:hidden' : ''}>
          {text}
        </span>
        {endIcon}
      </button>
  )
}

export default Button
