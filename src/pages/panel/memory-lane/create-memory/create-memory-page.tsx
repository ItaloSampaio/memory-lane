import { useGetMemoryLane } from '@hooks/memory-lane/use-get-memory-lane'
import { useCreateMemory } from '@hooks/memory/use-create-memory'
import { useNavigate, useParams } from 'react-router-dom'
import type { MemoryFormValues } from './create-memory-page-view'
import { CreateMemoryPageView } from './create-memory-page-view'

export const CreateMemoryPage = () => {
  const { laneId } = useParams<{ laneId: string }>()
  const { data: memoryLane } = useGetMemoryLane(laneId ?? '')
  const { mutateAsync, isPending } = useCreateMemory()
  const navigate = useNavigate()

  const handleSubmit = async (data: MemoryFormValues) => {
    if (!memoryLane) {
      return
    }

    await mutateAsync({
      ...data,
      timestamp: new Date(data.timestamp),
      laneId: memoryLane.id,
    })

    navigate('/', { replace: true })
  }

  const handleCancelClick = () => {
    navigate('/', { replace: true })
  }

  return (
    <CreateMemoryPageView
      submitting={isPending}
      onSubmit={handleSubmit}
      onCancelClick={handleCancelClick}
    />
  )
}

export default CreateMemoryPage
