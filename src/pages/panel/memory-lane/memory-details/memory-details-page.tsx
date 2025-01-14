import { useGetMemory } from '@hooks/memory/use-get-memory'
import { useNavigate, useParams } from 'react-router-dom'
import { MemoryDetailsPageView } from './memory-details-page-view'
import { useEffect } from 'react'

export const MemoryDetailsPage = () => {
  const { memoryId } = useParams<{ memoryId: string }>()
  const { data: memory, isPending } = useGetMemory(memoryId || '')
  const navigate = useNavigate()

  useEffect(() => {
    if (memory || isPending) {
      return
    }

    navigate('/')
  }, [isPending, memory, navigate])

  const handleCloseClick = () => {
    navigate(-1)
  }

  return (
    <MemoryDetailsPageView
      loading={isPending}
      memory={memory ?? null}
      onCloseClick={handleCloseClick}
    />
  )
}

export default MemoryDetailsPage
