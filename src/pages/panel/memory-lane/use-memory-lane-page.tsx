import { useContext } from 'react'
import { MemoryLanePageContext } from './memory-lane-page-context'

export const useMemoryLanePage = () => {
  const context = useContext(MemoryLanePageContext)
  if (!context) {
    throw new Error(
      'useMemoryLanePage must be used within a MemoryLaneProvider'
    )
  }

  return context
}
