import { cn } from '@utils/tailwind-utils'
import { useRef } from 'react'
import { SelectProvider, SelectProviderProps } from './select-context'

export interface SelectProps
  extends Pick<
    SelectProviderProps,
    'value' | 'textValue' | 'onChange' | 'children'
  > {
  className?: string
}

export const Select = ({ className, children, ...props }: SelectProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <SelectProvider selectRef={ref} {...props}>
      <div
        ref={ref}
        className={cn('relative inline-block text-left', className)}
      >
        {children}
      </div>
    </SelectProvider>
  )
}
