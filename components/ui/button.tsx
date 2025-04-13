// components/ui/button.tsx

import { forwardRef } from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 transition ${className}`}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
