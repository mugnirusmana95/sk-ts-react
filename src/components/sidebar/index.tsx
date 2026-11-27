import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { BiRadioCircle } from "react-icons/bi"

import { useClickOutside } from '~/hooks/useClickOutside'
import { useListMenu, type TMenu } from '~/components/sidebar/menus'
import RoundedTriangle from '~/shapes/triangle'

const isPathActive = (path: string, pathname: string) =>
  pathname === path || pathname.startsWith(`${path}/`)

const hasActiveChild = (menu: TMenu, pathname: string): boolean =>
  !!menu.children?.some(
    (child) =>
      (child.path && isPathActive(child.path, pathname)) || hasActiveChild(child, pathname),
  )

const renderBadge = (value: number) => {
  const maxValue = value > 99 ? '99+' : value

  return (
    <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-[#3a3c3c] min-w-8 flex items-center justify-center">
      {maxValue}
    </span>
  )
}

const getMenuBadge = (item: TMenu): number | null => {
  if (item.badge != null) {
    return item.badge
  }

  if (!item.children?.length) {
    return null
  }

  const total = item.children.reduce(
    (sum, child) => sum + (getMenuBadge(child) ?? 0),
    0
  )

  return total > 0 ? total : null
}

const itemBase =
  'group relative w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'

const itemIdle = 'text-sidebar-muted hover:bg-sidebar-hover hover:text-white'

const itemActiveTop =
  'bg-sidebar-active text-white before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-indigo-400'

const itemActiveChild = 'bg-sidebar-active text-white'

const MenuItem = ({ item, setShowMenu, isParent }: { item: TMenu, setShowMenu?: (val: boolean) => void, isParent: boolean }) => {
  const { pathname } = useLocation()
  const Icon = item.icon
  const badge = getMenuBadge(item)
  const hasChildren = !!item.children?.length
  const isChildActive = hasChildren && hasActiveChild(item, pathname)

  const [manualOpen, setManualOpen] = useState(false)
  const open = isChildActive || manualOpen

  const content = (
    <>
      {isParent && Icon && (
        <span className="w-7 flex items-center justify-start">
          <Icon size={20} />
        </span>
      )}
      {!isParent && (
        <span className="w-7 flex items-center justify-start">
          <BiRadioCircle size={10} />
        </span>
      )}
      <span className="flex-1 text-left uppercase font-light">{item.label}</span>

      {badge && renderBadge(badge)}
    </>
  )

  return (
    <div className="w-full flex flex-col">
      {hasChildren ? (
        <button
          type="button"
          aria-expanded={open}
          aria-disabled={isChildActive}
          className={`${itemBase} cursor-pointer ${isChildActive ? 'text-white' : itemIdle}`}
          onClick={() => {
            if (!isChildActive) setManualOpen((prev) => !prev)
          }}
        >
          {content}
          <IoChevronForwardOutline
            size={20}
            className={`transition-transform ${open ? 'rotate-90' : ''}`}
          />
        </button>
      ) : item.path ? (
        <NavLink
          to={item.path}
          onClick={() => setShowMenu?.(false)}
          className={({ isActive }) =>
            `${itemBase} ${isParent ? '' : 'py-1.5 font-normal'} ${isActive ? (isParent ? itemActiveTop : itemActiveChild) : itemIdle
            }`
          }
        >
          {content}
        </NavLink>
      ) : (
        <div className="ml-5.5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">{content}</div>
      )}

      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows,visibility] duration-300 ease-in-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] invisible'
            }`}
        >
          <div className="min-h-0 overflow-hidden">
            {isParent && (
              <div className="pt-1 ml-5 pl-4 flex flex-col gap-2 border-l border-l-gray-200 border-dashed">
                <div className="flex flex-col gap-2 pt-1">
                  {item.children!.map((child) => (
                    <MenuItem key={child.id} item={child} setShowMenu={setShowMenu} isParent={false} />
                  ))}
                </div>
              </div>
            )}

            {!isParent && (
              <div className="pt-1 ml-4 pl-3 flex flex-col gap-2 mt-1">
                {item.children!.map((child) => (
                  <MenuItem key={child.id} item={child} setShowMenu={setShowMenu} isParent={false} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const menus = useListMenu()

  const sidebarRef = useClickOutside<HTMLDivElement>(() => setShowMenu(false), {
    enabled: showMenu,
    escape: true,
  })

  return (
    <div ref={sidebarRef} className={`w-80 min-h-full shadow text-md fixed duration-300 ${showMenu ? 'left-0' : '-left-80'} bg-sidebar text-white z-11`}>
      <div className="w-full h-full flex flex-col gap-10 p-5 relative">
        <div className={`absolute h-screen top-0 -right-3 md:-right-10 w-5 md:w-10 flex flex-col justify-center duration-300 ${showMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div
            className={`w-full flex flex-col items-center animate-bounce md:animate-none justify-center duration-300 cursor-pointer ${showMenu ? 'h-[20%]' : 'h-[20%] md:h-[40%]'}`}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <RoundedTriangle
              corners={{ topLeft: 0, bottomLeft: 0, bottomRight: 0 }}
              className="w-3 md:w-10 h-3 md:h-10 shrink-0 bg-sidebar hidden md:flex"
            />
            <div className="flex-1 min-h-0 w-full bg-sidebar rounded md:rounded-none">&nbsp;</div>
            <RoundedTriangle
              corners={{ topLeft: 0, bottomLeft: 0, bottomRight: 0 }}
              className="w-3 md:w-10 h-3 md:h-10 shrink-0 rotate-90 bg-sidebar hidden md:flex"
            />
          </div>
        </div>
        <div className="font-light text-xl">T</div>
        <nav className="w-full flex flex-col gap-4">
          {menus.map((menu) => (
            <MenuItem key={menu.id} item={menu} setShowMenu={setShowMenu} isParent={true} />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
