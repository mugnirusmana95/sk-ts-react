import LoginPage from '@/pages/unauth/login'
import RegisterPage from '@/pages/unauth/register'

export const unauthRoute = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> }
]