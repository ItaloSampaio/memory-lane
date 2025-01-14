export interface CardTitleProps {
  children: React.ReactNode
}

export const CardTitle = ({ children }: CardTitleProps) => {
  return <p className='text-lg text-gray'>{children}</p>
}
