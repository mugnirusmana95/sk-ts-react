import HeaderNotify from '~/components/header/notify'
import HeaderProfile from '~/components/header/profile'

const Header = () => {
  return (
    <div className="h-14 md:h-20 w-full bg-sidebar md:py-3 pl-13 pr-3 text-white">
      <div className="w-full h-full flex flex-row items-center justify-end gap-5">
        <HeaderNotify />
        <HeaderProfile />
      </div>
    </div>
  )
}

export default Header
