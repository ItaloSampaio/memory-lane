import { getUser } from '@repositories/user-repository'
import { useQuery } from '@tanstack/react-query'

export const useGetUser = (mockFn?: typeof getUser) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: mockFn ?? getUser,
  })
}
