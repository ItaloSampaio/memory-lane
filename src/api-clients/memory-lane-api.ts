import { MemoryLane } from '@entities/memory-lane'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export interface CreateMemoryLaneDTO {
  userId: string
  title: string
  description: string
}

export interface UpdateMemoryLaneDTO {
  id: string
  title: string
  description: string
}

export const createMemoryLane = async (
  dto: CreateMemoryLaneDTO
): Promise<MemoryLane> => {
  const { data } = await api.post<MemoryLane>('/memory-lanes', dto)
  return data
}

export const listMemoryLanes = async (
  userId: string
): Promise<MemoryLane[]> => {
  const { data } = await api.get<MemoryLane[]>('/memory-lanes', {
    params: { userId },
  })
  return data
}

export const getMemoryLane = async (id: string): Promise<MemoryLane> => {
  const { data } = await api.get<MemoryLane>(`/memory-lanes/${id}`)
  return data
}

export const updateMemoryLane = async (
  dto: UpdateMemoryLaneDTO
): Promise<MemoryLane> => {
  const { id, ...payload } = dto
  const { data } = await api.put<MemoryLane>(`/memory-lanes/${id}`, payload)
  return data
}
