import { useClickOutside } from '@design-system/hooks/use-click-outside'
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react'

export interface SelectContextValue {
  open: boolean
  value?: string
  textValue?: string
  triggerRef: RefObject<HTMLButtonElement>
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onChange: (value: string) => void
}

export const SelectContext = createContext<SelectContextValue | undefined>(
  undefined
)

export interface SelectProviderProps {
  selectRef: RefObject<HTMLElement>
  value?: string
  textValue?: string
  onChange: (value: string) => void
  children: ReactNode
}

export const SelectProvider = ({
  selectRef,
  children,
  ...props
}: SelectProviderProps) => {
  const [open, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useClickOutside(selectRef, open, () => setIsOpen(false))

  return (
    <SelectContext.Provider value={{ open, triggerRef, setIsOpen, ...props }}>
      {children}
    </SelectContext.Provider>
  )
}
