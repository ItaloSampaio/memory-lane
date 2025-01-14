import { Button } from '@design-system/components/button/button'
import { Overlay } from '@design-system/components/overlay/overlay'
import { Paper } from '@design-system/components/paper/paper'
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon'
import 'keen-slider/keen-slider.min.css'
import { ImageSlider } from './components/image-slider'
import { MemoryDetails } from './components/memory-details'
import { Memory } from '@entities/memory'
import LoadingView from '@design-system/views/loading/loading-view'

export interface MemoryDetailsPageViewProps {
  loading: boolean
  memory: Memory | null
  onCloseClick: () => void
}

export const MemoryDetailsPageView = ({
  loading,
  memory,
  onCloseClick,
}: MemoryDetailsPageViewProps) => {
  return (
    <Overlay>
      {loading || !memory ? (
        <LoadingView animated className='text-white' />
      ) : (
        <div className='flex justify-center items-center w-full h-full'>
          <div className='lg:max-w-5xl w-full h-full lg:h-4/5 lg:mx-32 relative overflow-hidden'>
            <Paper className='w-full h-full relative'>
              <div className='flex flex-col lg:flex-row w-full h-full relative overflow-y-scroll lg:overflow-visible'>
                <ImageSlider srcs={memory.images} />
                <MemoryDetails
                  title={memory.title}
                  timestamp={memory.timestamp}
                  description={memory.description}
                />
              </div>
            </Paper>
            <div className='absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-white to-transparent lg:bg-none'>
              <Button
                variant='text'
                size='iconMd'
                className='float-end'
                onClick={onCloseClick}
              >
                <XMarkIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  )
}
