import { createUser } from '@api-clients/user-api'
import { saveUser } from '@repositories/user-repository'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../../entities/user'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<User>({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      saveUser(newUser)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
