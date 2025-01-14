import { createMemoryLane } from '@api-clients/memory-lane-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateMemoryLane = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMemoryLane,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['memory-lane'] }),
  })
}
