import { useState } from 'react'
import { Link } from 'react-router'

import { CgProfile } from 'react-icons/cg'
import { FaChevronRight } from 'react-icons/fa'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { IoSettingsOutline } from "react-icons/io5"

import { useLogout } from '~/features/auth/hook'
import { useClickOutside } from '~/hooks/useClickOutside'

import Confirmation from '~/components/confirmation'

const HeaderProfile = () => {
  const [openProfile, setOpenProfile] = useState(false)
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)
  const onLogout = useLogout()

  const profileRef = useClickOutside<HTMLDivElement>(() => setOpenProfile(false), {
    enabled: openProfile,
    escape: true,
  })

  return (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={openProfile}
        className="flex flex-row h-full gap-3 items-center font-bold cursor-pointer outline-none"
        onClick={() => setOpenProfile((prev) => !prev)}
      >
        <div className="w-6 md:w-8 h-6 md:h-8 bg-red-500 rounded-full">&nbsp;</div>
        <span>John</span>
        <FaChevronRight className={`transition-transform ${openProfile ? 'rotate-90' : ''}`} />
      </button>

      <div
        role="menu"
        className={`absolute right-0 top-full mt-2 z-20 min-w-40 p-2 flex flex-col gap-1 rounded border border-gray-200 bg-white text-black font-light shadow-2xl origin-top-right transition-all duration-300 ${openProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible pointer-events-none'}`}
      >
        <Link to="/profile" role="menuitem" className={'w-full p-2 flex flex-row gap-2 items-center rounded hover:bg-gray-200 cursor-pointer'} onClick={() => setOpenProfile(false)}>
          <CgProfile />
          <span>Profile</span>
        </Link>

        <button
          type="button"
          role="menuitem"
          disabled={onLogout?.isPending}
          className={`'w-full p-2 flex flex-row gap-2 items-center rounded hover:bg-gray-200 cursor-pointer disabled:opacity-50`}
          onClick={() => { }}
        >
          <IoSettingsOutline />
          <span>Setting</span>
        </button>

        <button
          type="button"
          role="menuitem"
          disabled={onLogout?.isPending}
          className={`'w-full p-2 flex flex-row gap-2 items-center rounded hover:bg-gray-200 cursor-pointer disabled:opacity-50`}
          onClick={() => {
            setOpenProfile(false)
            setShowConfirmLogout(true)
          }}
        >
          <RiLogoutCircleLine />
          <span>{onLogout?.isPending ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>

      <Confirmation
        open={showConfirmLogout}
        title="Logout"
        message="Apakah anda yakin ingin keluar dari aplikasi?"
        onConfirm={() => onLogout?.mutate()}
        onClose={() => setShowConfirmLogout(false)}
      />
    </div>
  )
}

export default HeaderProfile
