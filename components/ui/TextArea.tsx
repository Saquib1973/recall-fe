import React from 'react'

interface TextAreaProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  rows?: number
  [key: string]: any // Allow additional props
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder = '',
  value = '',
  onChange,
  className = '',
  rows = 4,
  ...rest
}) => {
  return (
    <textarea
      className={`bg-offwhite h-[200px] w-full resize-none p-2 outline-none rounded-md ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      {...rest}
    />
  )
}

export default TextArea
