import EllipsisHorizontalIcon from '@heroicons/react/20/solid/EllipsisHorizontalIcon'
import PlusIcon from '@heroicons/react/20/solid/PlusIcon'
import ShareIcon from '@heroicons/react/20/solid/ShareIcon'
import { Button } from './button'

export default { title: 'Components/Button' }

export const Default = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Button>Button</Button>
      <Button className='w-fit'>Button</Button>
    </div>
  )
}

export const Outlined = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Button variant='outlined'>Button</Button>
      <Button variant='outlined' className='w-fit'>
        Button
      </Button>
      <div className='mt-4' />
      <Button variant='outlined'>
        <PlusIcon />
        Button
      </Button>
      <Button variant='outlined' className='w-fit'>
        <PlusIcon />
        Button
      </Button>
      <div className='flex items-center gap-2 mt-4'>
        <Button variant='outlined' size='iconMd'>
          <PlusIcon />
        </Button>
        <Button variant='outlined' size='iconSm'>
          <PlusIcon />
        </Button>
        <Button variant='outlined' size='iconXs'>
          <PlusIcon />
        </Button>
      </div>
      <div className='flex items-center gap-2  mt-4'>
        <Button variant='outlined' intent='link' size='iconMd'>
          <ShareIcon />
        </Button>
        <Button variant='outlined' intent='link' size='iconSm'>
          <ShareIcon />
        </Button>
        <Button variant='outlined' intent='link' size='iconXs'>
          <ShareIcon />
        </Button>
      </div>
    </div>
  )
}

export const Text = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Button variant='text'>Button</Button>
      <div className='flex items-center gap-2  mt-4'>
        <Button variant='text' size='iconMd'>
          <EllipsisHorizontalIcon />
        </Button>
        <Button variant='text' size='iconSm'>
          <EllipsisHorizontalIcon />
        </Button>
        <Button variant='text' size='iconXs'>
          <EllipsisHorizontalIcon />
        </Button>
      </div>
    </div>
  )
}
