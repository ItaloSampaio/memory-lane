export interface CardContentProps {
  children: React.ReactNode
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className='grid gap-y-3'>{children}</div>
}
