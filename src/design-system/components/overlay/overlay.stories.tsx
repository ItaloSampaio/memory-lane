import { Overlay } from './overlay'

export default { title: 'Components/Overlay' }

export const Default = () => {
  return (
    <Overlay>
      <div className='text-white'>Overlay</div>
    </Overlay>
  )
}
