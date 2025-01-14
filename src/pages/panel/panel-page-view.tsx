import { Outlet } from 'react-router'
import { Sidebar } from './components/sidebar/sidebar'

export const PanelPageView = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='w-full overflow-scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default PanelPageView
