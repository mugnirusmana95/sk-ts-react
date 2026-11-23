import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useIsAuthed } from '~/stores/auth-store'

const AuthLayout = () => {
  const isAuth = useIsAuthed()
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (!isAuth && pathname) sessionStorage.setItem('NEXT_AUTH', pathname + search + hash)
    else sessionStorage.removeItem('NEXT_AUTH')
  }, [isAuth, pathname, search, hash])

  if (!isAuth) {
    const goNextUnauth = sessionStorage.getItem('NEXT_UNAUTH')
    return <Navigate to={goNextUnauth ?? '/login'} replace />
  }

  return (
    <div>
      Auth <br />
      <Outlet />
    </div>
  )
}

export default AuthLayout
