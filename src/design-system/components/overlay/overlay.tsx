import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface OverlayProps {
  children: ReactNode
}

export const Overlay = ({ children }: OverlayProps) => {
  return createPortal(
    <div className='bg-black bg-opacity-50 fixed top-0 left-0 bottom-0 right-0 z-50'>
      {children}
    </div>,
    document.body
  )
}
