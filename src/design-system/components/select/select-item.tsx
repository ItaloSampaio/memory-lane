import CheckCircle from '@heroicons/react/20/solid/CheckCircleIcon'
import { cn } from '@utils/tailwind-utils'
import { ReactNode } from 'react'
import { useSelect } from './use-select'

export interface SelectItemProps {
  value: string
  children: ReactNode
}

export const SelectItem = ({ value, children }: SelectItemProps) => {
  const { value: currentValue, onChange } = useSelect()

  const isSelected = currentValue === value

  return (
    <li>
      <button
        type='button'
        className={cn(
          'flex justify-between items-center w-full px-2 py-2 gap-2 text-left rounded-lg transition-colors hover:bg-slate-100',
          isSelected && 'bg-slate-50'
        )}
        onClick={() => onChange(value)}
      >
        {children}
        <CheckCircle
          className={cn(
            'w-4 h-4 flex-shrink-0 opacity-0',
            isSelected && 'opacity-100'
          )}
        />
      </button>
    </li>
  )
}
