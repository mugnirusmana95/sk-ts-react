import { Outlet } from 'react-router'

const PublicLayout = () => {
  return (
    <div>
      Public <br />
      <Outlet />
    </div>
  )
}

export default PublicLayout
