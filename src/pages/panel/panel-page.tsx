import { useListMemoryLanes } from '@hooks/memory-lane/use-list-memory-lanes'
import { useCreateUser } from '@hooks/user/use-create-user'
import { useGetUser } from '@hooks/user/use-get-user'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingView } from '../../design-system/views/loading/loading-view'
import { PanelPageView } from './panel-page-view'

export const PanelPage = () => {
  const location = useLocation()
  const { data: user, isPending: isUserPending } = useGetUser()
  const {
    data: memoryLanes,
    isPending: isMemoryLanesPending,
    isFetching: isFetchingMemoryLanes,
    isSuccess: isMemoryLanesSuccess,
  } = useListMemoryLanes(user?.id ?? '')
  const userCreation = useCreateUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user || isUserPending) {
      return
    }

    if (userCreation.isPending || userCreation.isSuccess) {
      return
    }

    userCreation.mutate()
  }, [userCreation, user, isUserPending])

  useEffect(() => {
    if (!user) {
      return
    }

    if (
      !memoryLanes ||
      isMemoryLanesPending ||
      isFetchingMemoryLanes ||
      !isMemoryLanesSuccess
    ) {
      return
    }

    if (memoryLanes.length === 0) {
      navigate('/welcome', { replace: true })
      return
    }

    if (location.pathname === '/') {
      const currentLaneId = memoryLanes?.[0]?.id
      navigate('/' + currentLaneId, { replace: true })
    }
  }, [
    user,
    memoryLanes,
    isFetchingMemoryLanes,
    isMemoryLanesPending,
    isMemoryLanesSuccess,
    navigate,
    location.pathname,
  ])

  if (isUserPending || isMemoryLanesPending) {
    return <LoadingView animated />
  }

  return <PanelPageView />
}

export default PanelPage
