import { Navigate, Outlet } from 'react-router'

const UnauthLayout = () => {
  const isAuth = true

  if (isAuth) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div>
      Unauth <br />
      <Outlet />
    </div>
  )
}

export default UnauthLayout