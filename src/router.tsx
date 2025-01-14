import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoadingView } from './design-system/views/loading/loading-view'

const NotFoundPage = React.lazy(
  () => import('./pages/not-found/not-found-page')
)
const PanelPage = React.lazy(() => import('./pages/panel/panel-page'))
const WelcomePage = React.lazy(() => import('./pages/welcome/welcome-page'))
const MemoryLanePage = React.lazy(
  () => import('./pages/panel/memory-lane/memory-lane-page')
)
const MemoryDetailsPage = React.lazy(
  () => import('./pages/panel/memory-lane/memory-details/memory-details-page')
)
const CreateMemoryPage = React.lazy(
  () => import('./pages/panel/memory-lane/create-memory/create-memory-page')
)

export const Router = () => {
  return (
    <Suspense fallback={<LoadingView animated />}>
      <Routes>
        <Route path='/' element={<PanelPage />}>
          <Route path='/:laneId' element={<MemoryLanePage />}>
            <Route path='/:laneId/memory/new' element={<CreateMemoryPage />} />
            <Route
              path='/:laneId/memory/:memoryId'
              element={<MemoryDetailsPage />}
            />
          </Route>
        </Route>
        <Route path='/share/:laneId' element={<MemoryLanePage readOnly />} />
        <Route
          path='/share/:laneId/memory/:memoryId'
          element={<MemoryDetailsPage />}
        />
        <Route path='/welcome' element={<WelcomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
