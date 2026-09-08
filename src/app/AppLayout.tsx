import { Outlet } from 'react-router-dom'
import { TabBar } from '../components/TabBar'

export function AppLayout() {
  return (
    <div>
      <Outlet />
      <TabBar />
    </div>
  )
}
