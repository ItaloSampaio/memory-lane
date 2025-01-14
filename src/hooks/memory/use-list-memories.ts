import { useQuery } from '@tanstack/react-query'
import { listMemories } from '@api-clients/memory-api'
import { Memory } from '@entities/memory'

export const useListMemories = (
  laneId: string,
  sortOrder: 'asc' | 'desc' = 'asc',
  mockFn?: typeof listMemories
) => {
  return useQuery<Memory[]>({
    queryKey: ['memories', laneId, sortOrder],
    queryFn: () =>
      mockFn ? mockFn(laneId, sortOrder) : listMemories(laneId, sortOrder),
    enabled: Boolean(laneId),
  })
}
