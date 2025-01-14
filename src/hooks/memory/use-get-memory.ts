import { getMemory } from '@api-clients/memory-api'
import { Memory } from '@entities/memory'
import { useQuery } from '@tanstack/react-query'

export const useGetMemory = (id: string) => {
  return useQuery<Memory>({
    queryKey: ['memory', id],
    queryFn: () => getMemory(id),
    enabled: Boolean(id),
  })
}
