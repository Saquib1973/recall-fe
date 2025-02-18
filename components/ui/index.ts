interface CardProps {
  title: string
  id: string
  link: string
  description?: string
  tags: string[]
  user: { username: string; _id: string }
  type: 'twitter' | 'youtube' | 'pinterest' | 'instagram' | 'others'
  index?:number
}
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: () => void
  css?: string
  [key: string]: any
}
interface AuthWrapperProps {
  children: React.ReactNode
}

interface ModalProps {
  open?: boolean
  onClose: () => void
  confirmText?: string
  cancelText?:string
  onConfirm: () => void
  description: string
}
interface InputProps {
  type?: string;
  placeholder: string;
  value?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  [key: string]: any;
}


export type { CardProps,ButtonProps,AuthWrapperProps ,ModalProps,InputProps}