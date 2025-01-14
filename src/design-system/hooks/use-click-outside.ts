import { useEffect, RefObject } from 'react'

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  enabled: boolean,
  onClick: () => void
): void => {
  useEffect(() => {
    if (!enabled || !ref.current) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current!.contains(event.target as Node)) {
        return
      }

      onClick()
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref.current, onClick, enabled])
}
