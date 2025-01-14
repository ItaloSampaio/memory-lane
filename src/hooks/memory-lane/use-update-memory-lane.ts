import { useMutation } from '@tanstack/react-query'
import { updateMemoryLane } from '@api-clients/memory-lane-api'

export const useUpdateMemoryLane = () => {
  return useMutation({
    mutationFn: updateMemoryLane,
  })
}
