import { User } from '@entities/user'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const createUser = async () => {
  const { data } = await api.post<User>('/users')
  return data
}
