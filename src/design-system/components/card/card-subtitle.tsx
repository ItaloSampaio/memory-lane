export interface CardSubtitleProps {
  children: React.ReactNode
}

export const CardSubtitle = ({ children }: CardSubtitleProps) => {
  return <p>{children}</p>
}
