import { cn } from '@utils/tailwind-utils'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-x-2 rounded-lg transition-colors [&_svg]:size-6 [&_svg]:shrink-0',
  {
    variants: {
      intent: {
        primary: 'bg-black text-white',
        link: 'text-blue-600',
        danger: 'bg-red-500',
      },
      variant: {
        contained: 'hover:bg-slate-700',
        outlined: 'border border-current bg-transparent hover:bg-slate-100',
        text: 'bg-transparent hover:bg-slate-100',
      },
      size: {
        md: 'px-4 h-11',
        iconXs: 'size-7 [&_svg]:size-4',
        iconSm: 'size-9 [&_svg]:size-5',
        iconMd: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'contained',
      intent: 'primary',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'outlined',
        intent: 'primary',
        className: 'text-black',
      },
      {
        variant: 'text',
        intent: 'primary',
        className: 'text-black',
      },
      {
        variant: 'text',
        intent: 'danger',
        className: 'text-red-500 hover:text-slate-50 hover:bg-red-500',
      },
    ],
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, intent, size, className }))}
        {...props}
      />
    )
  }
)
