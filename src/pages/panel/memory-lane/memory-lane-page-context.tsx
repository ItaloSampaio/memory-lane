import { listMemories } from '@api-clients/memory-api'
import { getMemoryLane } from '@api-clients/memory-lane-api'
import { Memory } from '@entities/memory'
import { MemoryLane } from '@entities/memory-lane'
import { useGetMemoryLane } from '@hooks/memory-lane/use-get-memory-lane'
import { useListMemories } from '@hooks/memory/use-list-memories'
import { SortDirection } from '@utils/sort-utils'
import { ReactNode, createContext, useState } from 'react'

export interface MemoryLanePageContextValue {
  readOnly: boolean
  loadingLane: boolean
  loadingMemories: boolean
  memoryLane: MemoryLane | null
  memories: Memory[] | null
  setSortOrder: React.Dispatch<React.SetStateAction<SortDirection>>
  goToSignUp: () => void
  goToMemoryDetails: (memoryId: string) => void
  goToCreateMemory: () => void
}

export const MemoryLanePageContext = createContext<
  MemoryLanePageContextValue | undefined
>(undefined)

export interface MemoryLanePageProviderProps {
  readOnly: boolean
  laneId: string
  goToSignUp: MemoryLanePageContextValue['goToSignUp']
  goToMemoryDetails: MemoryLanePageContextValue['goToMemoryDetails']
  goToCreateMemory: MemoryLanePageContextValue['goToCreateMemory']
  children: ReactNode
  mockGetMemoryLane?: typeof getMemoryLane
  mockListMemories?: typeof listMemories
}

export const MemoryLanePageProvider = ({
  readOnly,
  laneId,
  goToSignUp,
  goToMemoryDetails,
  goToCreateMemory,
  children,
  mockGetMemoryLane,
  mockListMemories,
}: MemoryLanePageProviderProps) => {
  const [sortOrder, setSortOrder] = useState<SortDirection>('asc')

  const { data: memoryLane, isLoading: isLoadingLane } = useGetMemoryLane(
    laneId,
    mockGetMemoryLane
  )
  const { data: memories, isLoading: isLoadingMemories } = useListMemories(
    laneId,
    sortOrder,
    mockListMemories
  )

  return (
    <MemoryLanePageContext.Provider
      value={{
        readOnly,
        loadingLane: isLoadingLane,
        loadingMemories: isLoadingMemories,
        memoryLane: memoryLane ?? null,
        memories: memories ?? null,
        setSortOrder,
        goToSignUp,
        goToMemoryDetails,
        goToCreateMemory,
      }}
    >
      {children}
    </MemoryLanePageContext.Provider>
  )
}
