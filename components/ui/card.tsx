import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Card({ className = '', ...props }: CardProps) {
  return <div className={`bg-white rounded-lg ${className}`} {...props} />
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function CardContent({ className = '', ...props }: CardContentProps) {
  return <div className={`p-2 ${className}`} {...props} />
}
