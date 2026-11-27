import { Navigate, Outlet, useLocation } from 'react-router'

import { useIsAuthed } from '~/stores/auth'

import Sidebar from '~/components/sidebar'
import Header from '~/components/header'

const AuthLayout = () => {
  const isAuth = useIsAuthed()
  const location = useLocation()

  if (!isAuth) {
    const isLogout = location.state?.reason === 'logout'

    return (
      <Navigate
        to="/login"
        replace
        state={isLogout ? null : { from: location }}
      />
    )
  }

  return (
    <div className="max-w-screen min-h-screen max-h-screen flex flex-row font-inter">
      <Sidebar />

      <div className="w-full flex flex-col no-scrollbar bg-gray-300 z-10">
        <Header />

        <div className="w-full h-full p-2 md:p-5 pl-5 md:pl-16">
          <div
            key={location.pathname}
            className="w-full h-full animate-page-in motion-reduce:animate-none"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout