"use client"
import React from 'react'

interface TextAreaProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  label?:string
  rows?: number
  [key: string]: any // Allow additional props
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder = '',
  value = '',
  onChange,
  label="",
  className = '',
  rows = 4,
  ...rest
}) => {
  return (
      <div className="flex flex-col gap-1 w-full">

      <label className="text-gray-500 capitalize">{label}</label>
    <textarea
      className={`bg-offwhite h-[200px] w-full resize-none p-2 outline-none rounded-md ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      {...rest}
      />
      </div>
  )
}

export default TextArea
