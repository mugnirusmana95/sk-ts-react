import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useIsAuthed } from '~/stores/auth'

const UnauthLayout = () => {
  const isAuth = useIsAuthed()
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (isAuth && pathname) sessionStorage.setItem('NEXT_UNAUTH', pathname + search + hash)
    else sessionStorage.removeItem('NEXT_UNAUTH')
  }, [isAuth, pathname, search, hash])

  if (isAuth) {
    const goNextAuth = sessionStorage.getItem('NEXT_AUTH')
    return <Navigate to={goNextAuth ?? '/dashboard'} replace />
  }

  return (
    <div>
      Unauth <br />
      <Outlet />
    </div>
  )
}

export default UnauthLayout
