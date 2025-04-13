import { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg bg-gray-100 text-black hover:bg-gray-200 ${className}`}
      {...props}
    />
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function CardContent({ className = "", ...props }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`} {...props} />
  )
}
