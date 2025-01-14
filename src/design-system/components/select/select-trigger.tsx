import { cn } from '@utils/tailwind-utils'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon'
import { useSelect } from './use-select'

export interface SelectTriggerProps {
  className?: string
  placeholder?: string
}

export const SelectTrigger = ({
  className,
  placeholder = 'Select',
}: SelectTriggerProps) => {
  const { open, value, textValue, triggerRef, setIsOpen } = useSelect()

  const toggleOpen = () => {
    setIsOpen((current) => !current)
  }

  return (
    <button
      ref={triggerRef}
      type='button'
      className={cn(
        'flex items-center justify-between gap-2 w-full min-w-2 h-11 bg-white shadow-md px-4 py-2 rounded-lg whitespace-nowrap transition-colors hover:bg-slate-100 focus:outline-none',
        className
      )}
      onClick={toggleOpen}
    >
      <span className='truncate'>{textValue ?? value ?? placeholder}</span>
      <ChevronDownIcon
        className={cn('w-4 h-4 flex-shrink-0', { 'rotate-180': open })}
      />
    </button>
  )
}
