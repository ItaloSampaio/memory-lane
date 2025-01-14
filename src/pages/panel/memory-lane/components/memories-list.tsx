import { Card } from '@design-system/components/card/card'
import { CardContent } from '@design-system/components/card/card-content'
import { CardDescription } from '@design-system/components/card/card-description'
import { CardImage } from '@design-system/components/card/card-image'
import { CardSubtitle } from '@design-system/components/card/card-subtitle'
import { CardTitle } from '@design-system/components/card/card-title'
import { formatDateToUSLocale } from '@utils/date-utils'
import { useMemoryLanePage } from '../use-memory-lane-page'
import CubeIcon from '@heroicons/react/20/solid/CubeIcon'

export const MemoriesList = () => {
  const { readOnly, loadingMemories, memories, goToMemoryDetails } =
    useMemoryLanePage()

  if (loadingMemories) {
    return (
      <div className='flex justify-center mt-32 animate-ping'>
        <CubeIcon className='size-8' />
      </div>
    )
  }

  if (!memories?.length) {
    return (
      <div className='text-center mt-32'>
        <h2 className='text-2xl font-semibold mb-4'>No memories found</h2>
        {!readOnly && (
          <p className='text-lg text-slate-600 mb-6'>
            You haven’t created any memories yet. Start preserving your moments
            today!
          </p>
        )}
      </div>
    )
  }

  return (
    <div className='pb-8 space-y-8 flex flex-col items-center'>
      {memories.map((memory) => (
        <Card
          key={memory.id}
          className='w-5/12'
          onClick={() => goToMemoryDetails(memory.id)}
        >
          <CardImage src={memory.images} />
          <CardContent>
            <CardTitle>{memory.title}</CardTitle>
            <CardSubtitle>
              {formatDateToUSLocale(memory.timestamp)}
            </CardSubtitle>
            <CardDescription>{memory.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
