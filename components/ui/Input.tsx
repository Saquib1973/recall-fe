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
    <div className="flex flex-col gap-1 w-full">
      <label className="text-gray-500 capitalize">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-offwhite p-2 w-full outline-none rounded-md ${className}`}
      {...rest}
      />
      </div>
  )
}

export default Input
