import { useQuery } from '@tanstack/react-query'
import { listMemoryLanes } from '@api-clients/memory-lane-api'

export const useListMemoryLanes = (
  userId: string,
  mockFn?: typeof listMemoryLanes
) => {
  return useQuery({
    queryKey: ['memory-lane', 'user', userId],
    queryFn: () => (mockFn ? mockFn(userId) : listMemoryLanes(userId)),
    enabled: Boolean(userId),
  })
}
