import { Button } from '@design-system/components/button/button'
import XCircleIcon from '@heroicons/react/20/solid/XCircleIcon'

export interface ImagePreviewProps {
  src: File | string
  name: string
  onRemoveClick: (event: React.SyntheticEvent) => void
}

export const ImagePreview = ({
  src,
  name,
  onRemoveClick,
}: ImagePreviewProps) => {
  const imageURL = typeof src === 'string' ? src : URL.createObjectURL(src)

  return (
    <div className='relative w-32 h-32 border rounded-lg overflow-hidden flex-shrink-0'>
      <img src={imageURL} alt={name} className='object-cover w-full h-full' />
      <Button
        variant='text'
        size='iconXs'
        intent='danger'
        onClick={onRemoveClick}
        className='absolute top-1 right-1'
      >
        <XCircleIcon />
      </Button>
      <p className='text-sm text-center truncate mt-1'>{name}</p>
    </div>
  )
}
