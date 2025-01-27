import React from 'react';
import type { InputProps } from '.';



const Input: React.FC<InputProps> = ({
  type="text",
  placeholder,
  value,
  onChange,
  className = '',
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-offwhite p-2 w-full outline-none rounded-md ${className}`}
      {...rest}
    />
  );
};

export default Input;