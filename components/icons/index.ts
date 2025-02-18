
export interface IconProps {
  size?: 'sm' | 'md' | 'lg'
  css?: string
  onClick?: () => void

  [key:string]:any
}
export const IconSizeVariants = {
  sm: 'size-5 max-md:size-4',
  md: 'size-7 max-md:size-5',
  lg: 'size-9 max-md:size-7',
}
