import axios from 'axios'
import { Memory } from '@entities/memory'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export interface CreateMemoryDTO {
  laneId: string
  title: string
  description: string
  timestamp: Date
  images: File[]
}

export interface UpdateMemoryDTO {
  id: string
  laneId: string
  title: string
  description: string
  timestamp: Date
  preserveImages?: string[]
  images?: File[]
}

export const createMemory = async (dto: CreateMemoryDTO): Promise<Memory> => {
  const formData = new FormData()

  formData.append('laneId', dto.laneId)
  formData.append('title', dto.title)
  formData.append('description', dto.description)
  formData.append('timestamp', dto.timestamp.toISOString())

  dto.images.forEach((image) => {
    formData.append('images', image)
  })

  const { data } = await api.post('/memories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return mapToMemory(data)
}

export const listMemories = async (
  laneId: string,
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<Memory[]> => {
  const { data } = await api.get(`/memories`, {
    params: { laneId, sort: `timestamp_${sortOrder}` },
  })
  return mapToMemoryList(data)
}

export const getMemory = async (id: string): Promise<Memory> => {
  const { data } = await api.get(`/memories/${id}`)
  return mapToMemory(data)
}

export const updateMemory = async (dto: UpdateMemoryDTO): Promise<Memory> => {
  const formData = new FormData()

  formData.append('laneId', dto.laneId)
  formData.append('title', dto.title)
  formData.append('description', dto.description)
  formData.append('timestamp', dto.timestamp.toISOString())

  if (dto.preserveImages) {
    dto.preserveImages.forEach((image) => {
      formData.append('preserveImages', image)
    })
  }

  if (dto.images) {
    dto.images.forEach((image) => {
      formData.append('images', image)
    })
  }

  const { data } = await api.put(`/memories/${dto.id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return mapToMemory(data)
}

export const deleteMemory = async (id: string): Promise<void> => {
  await api.delete(`/memories/${id}`)
}

const mapToMemory = (data: any): Memory => ({
  id: data.id,
  laneId: data.laneId,
  title: data.title,
  description: data.description,
  timestamp: new Date(data.timestamp),
  images: data.images.map((item: string) => api.getUri() + item),
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
})

const mapToMemoryList = (data: any[]): Memory[] => {
  return data.map(mapToMemory)
}
