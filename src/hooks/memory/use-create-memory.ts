import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMemory, CreateMemoryDTO } from '@api-clients/memory-api'
import { Memory } from '@entities/memory'

export const useCreateMemory = () => {
  const queryClient = useQueryClient()

  return useMutation<Memory, Error, CreateMemoryDTO>({
    mutationFn: createMemory,
    onSuccess: (newMemory, variables) => {
      queryClient.setQueryData(
        ['memories', variables.laneId],
        (oldData?: Memory[]) => {
          if (!oldData) {
            return [newMemory]
          }

          return [newMemory, ...oldData]
        }
      )
    },
    onError: (error) => {
      console.error('Failed to create memory:', error)
    },
  })
}
