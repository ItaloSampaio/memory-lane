import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { MemoryLanePageProvider } from './memory-lane-page-context'
import MemoryLanePageView from './memory-lane-page-view'

export interface MemoryLanePageProps {
  readOnly?: boolean
}

export const MemoryLanePage = ({ readOnly = false }: MemoryLanePageProps) => {
  const { laneId } = useParams<{ laneId: string }>()
  const navigate = useNavigate()

  const goToSignUp = () => {
    navigate('/')
  }

  const goToMemoryDetails = (memoryId: string) => {
    navigate('memory/' + memoryId)
  }

  const goToCreateMemory = () => {
    navigate('memory/new')
  }

  return (
    <MemoryLanePageProvider
      readOnly={readOnly}
      laneId={laneId!}
      goToSignUp={goToSignUp}
      goToMemoryDetails={goToMemoryDetails}
      goToCreateMemory={goToCreateMemory}
    >
      <MemoryLanePageView />
      <Outlet />
    </MemoryLanePageProvider>
  )
}

export default MemoryLanePage
