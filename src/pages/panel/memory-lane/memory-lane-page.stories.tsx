import { Memory } from '@entities/memory'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  MemoryLanePageProvider,
  MemoryLanePageProviderProps,
} from './memory-lane-page-context'
import { MemoryLanePageView } from './memory-lane-page-view'

export default { title: 'Pages/Panel/MemoryLanePage' }

const mockGetMemoryLane: MemoryLanePageProviderProps['mockGetMemoryLane'] =
  async () => {
    return {
      id: 'lane-id',
      userId: 'user-id',
      title: 'Mock Memory Lane',
      description: 'A collection of memories.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

const mockListMemories: MemoryLanePageProviderProps['mockListMemories'] =
  async () => {
    const memories: Memory[] = [
      {
        id: 'memory-1',
        laneId: 'lane-id',
        title: 'Mock Memory 1',
        description: 'I was born on a sunny day on planet earth',
        timestamp: new Date(),
        images: [
          'https://picsum.photos/400/300',
          'https://picsum.photos/500/300',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'memory-2',
        laneId: 'lane-id',
        title: 'Mock Memory 2',
        description: 'Second mock memory.',
        timestamp: new Date(),
        images: [
          'https://picsum.photos/450/300',
          'https://picsum.photos/350/300',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    return memories
  }

const queryClient = new QueryClient()

export const Default = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryLanePageProvider
        readOnly={false}
        laneId='lane-id'
        goToSignUp={() => {}}
        goToMemoryDetails={() => {}}
        goToCreateMemory={() => {}}
        mockGetMemoryLane={mockGetMemoryLane}
        mockListMemories={mockListMemories}
      >
        <MemoryLanePageView />
      </MemoryLanePageProvider>
    </QueryClientProvider>
  )
}
