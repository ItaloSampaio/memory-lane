export interface CardDescriptionProps {
  children: React.ReactNode
}

export const CardDescription = ({ children }: CardDescriptionProps) => {
  return <p className='text-sm line-clamp-3'>{children}</p>
}
