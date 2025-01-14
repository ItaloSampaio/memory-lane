import { invariant } from '@utils/invariant'
import { useContext } from 'react'
import { SelectContext, SelectContextValue } from './select-context'

export const useSelect = (): SelectContextValue => {
  const contextValue = useContext(SelectContext)

  invariant(
    contextValue,
    new Error('useSelect must be used within a SelectProvider')
  )

  return contextValue
}
