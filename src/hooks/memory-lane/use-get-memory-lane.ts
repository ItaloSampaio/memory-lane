import { useQuery } from '@tanstack/react-query'
import { getMemoryLane } from '@api-clients/memory-lane-api'

export const useGetMemoryLane = (id: string, mockFn?: typeof getMemoryLane) => {
  return useQuery({
    queryKey: ['memory-lane', id],
    queryFn: () => (mockFn ? mockFn(id) : getMemoryLane(id)),
    enabled: Boolean(id),
  })
}
