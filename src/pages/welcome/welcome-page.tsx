import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MemoryLaneFormValues } from './welcome-page-view'
import { WelcomePageView } from './welcome-page-view'
import { useCreateMemoryLane } from '@hooks/memory-lane/use-create-memory-lane'
import { useGetUser } from '@hooks/user/use-get-user'
import { useListMemoryLanes } from '@hooks/memory-lane/use-list-memory-lanes'
import LoadingView from '../../design-system/views/loading/loading-view'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: user, isPending: isUserPending } = useGetUser()
  const {
    data: memoryLanes,
    isPending: isMemoryLanesPending,
    isFetching: isFetchingMemoryLanes,
  } = useListMemoryLanes(user?.id ?? '')
  const { isPending, mutate } = useCreateMemoryLane()

  useEffect(() => {
    // If the user is not available and the data is not loading,
    // we must assume that the page was accessed directly. Then
    // we should redirect to the index page to proceed with user creation
    if (!user && !isUserPending) {
      navigate('/')
    }
  }, [user, isUserPending, navigate])

  useEffect(() => {
    // If the user already has a memory lane or has just created one,
    // we should redirect to the index page
    if (!memoryLanes?.length) {
      return
    }

    navigate('/')
  }, [memoryLanes, navigate])

  const handleFormSubmit = (values: MemoryLaneFormValues) => {
    mutate({ ...values, userId: user!.id })
  }

  if (isMemoryLanesPending || isFetchingMemoryLanes || memoryLanes?.length) {
    return <LoadingView animated />
  }

  return <WelcomePageView submitting={isPending} onSubmit={handleFormSubmit} />
}

export default WelcomePage
