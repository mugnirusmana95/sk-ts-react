import DashboardPage from '~/pages/auth/dashboard'
import ProfilePage from '~/pages/auth/profile'

export const authRoute = [
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
]
