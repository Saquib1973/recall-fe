'use client'

import React from 'react'
import type { InputProps } from '.'

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  label="",
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label className="text-black-3 capitalize">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={` dark:bg-black-2 dark:text-white-1 border bg-white-1.5 dark:border-black-3 p-2 w-full outline-none rounded-md ${className}`}
      {...rest}
      />
      </div>
  )
}

export default Input
