import { createBrowserRouter } from "react-router"

import PublicLayout from '@/routes/layouts/public'
import AuthLayout from '@/routes/layouts/auth'
import UnauthLayout from '@/routes/layouts/unauth'

import { publicRoute } from '@/routes/public'
import { authRoute } from '@/routes/auth'
import { unauthRoute } from '@/routes/unauth'

export const routes = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: publicRoute.map((item) => (item))
  },
  {
    element: <AuthLayout />,
    children: authRoute.map((item) => (item))
  },
  {
    element: <UnauthLayout />,
    children: unauthRoute.map((item) => (item))
  }
])