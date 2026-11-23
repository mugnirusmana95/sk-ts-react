import { Navigate, Outlet } from 'react-router'

const AuthLayout = () => {
  const isAuth = true

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      Auth <br />
      <Outlet />
    </div>
  )
}

export default AuthLayout