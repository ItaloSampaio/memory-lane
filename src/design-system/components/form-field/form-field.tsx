import { cn } from '@utils/tailwind-utils'
import React, { forwardRef } from 'react'

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  as?: 'input' | 'textarea'
  label?: string
  error?: string
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ as: Component = 'input', label, error, id, ...props }, ref) => {
  return (
    <div className={props.className}>
      {label && (
        <label htmlFor={id} className='block text-slate-700 font-medium mb-2'>
          {label}
        </label>
      )}
      <Component
        id={id}
        ref={ref as any}
        {...props}
        className={cn(
          'shadow appearance-none border rounded-lg w-full py-2 px-3 text-slate-700',
          error && 'border-red-500'
        )}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  )
})
