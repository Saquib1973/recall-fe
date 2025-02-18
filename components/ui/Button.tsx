'use client'

import React from 'react'
import type { ButtonProps } from '.'

const buttonStyles = {
  primary: 'border-transparent bg-black text-white',
  secondary: 'bg-white text-black',
  tertiary:"bg-red-500 text-white"
}
const sizeStyles = {
  sm: 'px-3 py-2 text-sm font-light',
  md: 'lg:px-5 lg:py-3 px-2 sm:px-4 py-2 text-sm sm:text-base',
  lg: 'px-2 py-1 md:px-6 md:py-3 text-base md:text-lg font-semibold',
}
const globalStyles =
  'border capitalize rounded-3xl tracking-wider flex gap-2 items-center justify-center'

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
    <div>
      <button
        className={`flex border ${buttonStyles[variant]}  ${sizeStyles[size]} ${globalStyles} ${css} `}
        onClick={onClick}
        {...rest}
      >
        {startIcon}
        <span className={!text ? "hidden" : startIcon || endIcon ? 'max-lg:hidden' : ''}>
          {text}
        </span>
        {endIcon}
      </button>
    </div>
  )
}

export default Button
