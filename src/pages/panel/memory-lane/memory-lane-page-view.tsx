import { Controls } from './components/controls'
import { Header } from './components/header'
import { MemoriesList } from './components/memories-list'

export const MemoryLanePageView = () => {
  return (
    <div className='max-w-screen-lg w-full mx-auto mt-12'>
      <Header />
      <Controls />
      <MemoriesList />
    </div>
  )
}

export default MemoryLanePageView
