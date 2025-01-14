import { Button } from '@design-system/components/button/button'
import { Card } from '@design-system/components/card/card'
import CubeIcon from '@heroicons/react/20/solid/CubeIcon'
import ShareIcon from '@heroicons/react/20/solid/ShareIcon'
import PencilIcon from '@heroicons/react/24/outline/PencilIcon'
import { useState } from 'react'
import { useMemoryLanePage } from '../use-memory-lane-page'
import { ShareLinkModal } from './share-link-modal'

export const Header = () => {
  const { readOnly, memoryLane, goToSignUp } = useMemoryLanePage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl'>{memoryLane?.title ?? ''}</h1>
        {!readOnly ? (
          <Button
            variant='outlined'
            intent='link'
            size='iconMd'
            onClick={handleOpenModal}
          >
            <ShareIcon />
          </Button>
        ) : (
          <Button variant='outlined' onClick={goToSignUp}>
            <CubeIcon />
            Start preserving your own moments!
          </Button>
        )}
      </div>
      <Card className='w-full mb-12 px-3 relative'>
        <p>{memoryLane?.description ?? ''}</p>
        {!readOnly && (
          <Button
            variant='text'
            size='iconSm'
            className='absolute bottom-1 right-1'
          >
            <PencilIcon />
          </Button>
        )}
      </Card>
      {isModalOpen && <ShareLinkModal onCloseClick={handleCloseModal} />}
    </>
  )
}
