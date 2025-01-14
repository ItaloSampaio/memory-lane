import { MemoryDetailsPageView } from './memory-details-page-view'
import { Memory } from '@entities/memory'

export default { title: 'Pages/Panel/MemoryDetailsPage' }

const memory: Memory = {
  id: 'memory-id',
  laneId: 'lane-id',
  title: 'Mock Memory',
  description: 'This is a description of a mock memory.',
  timestamp: new Date(),
  images: ['https://picsum.photos/600/300', 'https://picsum.photos/500/300'],
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const Default = () => {
  return (
    <MemoryDetailsPageView
      loading={false}
      memory={memory}
      onCloseClick={() => {}}
    />
  )
}

export const Loading = () => {
  return (
    <MemoryDetailsPageView
      loading={true}
      memory={null}
      onCloseClick={() => {}}
    />
  )
}

export const NoMemory = () => {
  return (
    <MemoryDetailsPageView
      loading={false}
      memory={null}
      onCloseClick={() => {}}
    />
  )
}
