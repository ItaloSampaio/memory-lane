import { cn } from '@utils/tailwind-utils'
import { Paper } from '../paper/paper'

interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export const Card = ({ className, onClick, children }: CardProps) => {
  return (
    <Paper
      className={cn(
        { 'cursor-pointer hover:bg-slate-50': Boolean(onClick) },
        className
      )}
      onClick={onClick}
    >
      <div className='px-4 py-7 flex items-center space-x-4'>{children}</div>
    </Paper>
  )
}
