import { cn } from '@utils/tailwind-utils'

interface PaperProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

export const Paper = ({ className, onClick, children }: PaperProps) => {
  return (
    <div
      className={cn(
        'bg-white shadow-paper rounded-lg w-fit overflow-hidden',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
