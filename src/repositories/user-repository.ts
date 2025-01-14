import type { User } from '@entities/user'

const USER_KEY = 'user'

export const getUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY)
  if (!data) {
    return null
  }

  try {
    return JSON.parse(data) as User
  } catch (error) {
    console.error('Failed to parse user from local storage:', error)
    return null
  }
}

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (error) {
    console.error('Failed to save user to local torage:', error)
  }
}
