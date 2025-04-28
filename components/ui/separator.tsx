import { HTMLAttributes } from 'react'

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Separator({ className = '', ...props }: SeparatorProps) {
  return (
    <div
      className={`h-px w-full bg-gray-200 ${className}`}
      role="separator"
      {...props}
    />
  )
}
