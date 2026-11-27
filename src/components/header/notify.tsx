import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import moment from 'moment/moment'

import { IoIosNotifications } from "react-icons/io"

import { useClickOutside } from '~/hooks/useClickOutside'

type TNotifyItem = {
  id: string
  path?: string | null
  title: string
  message: string
  createdAt: string
  hasRead: boolean
}

const HeaderNotify = () => {
  const [openNotify, setOpenNotify] = useState(false)
  const listNotify: TNotifyItem[] = [
    { id: '1', path: '/notify/1', title: 'Title 1', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', createdAt: '2026-11-25T02:30:11+07', hasRead: false },
    { id: '2', path: null, title: 'Title 2', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', createdAt: '2026-11-25T02:30:11+07', hasRead: true }
  ]
  const hasUnRead = useMemo(() => {
    const result = listNotify?.find((item) => !item?.hasRead)
    return !!result
  }, [listNotify])

  const notifyRef = useClickOutside<HTMLDivElement>(() => setOpenNotify(false), {
    enabled: openNotify,
    escape: true,
  })

  const renderItemNotify = (item: TNotifyItem, index: number) => {
    const targetDate = moment(item?.createdAt)
    const now = moment().toDate()
    const humanizeDate = moment.duration(targetDate.diff(now)).humanize(true)

    return (
      <Link
        key={`header-notify-${index}`}
        to={item?.path ?? "#"}
        role="notifitem"
        className={`duration-300 w-full flex flex-col gap-1 p-1 rounded border ${item?.hasRead ? 'border-gray-200' : 'border-red-500'} hover:bg-gray-200 ${item?.path ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => setOpenNotify(false)}
      >
        {!item?.hasRead && <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute top-3.5 right-3">&nbsp;</div>}
        <span className="font-bold">{item?.title}</span>
        <span className="text-sm text-left line-clamp-2 wrap-break-word">{item?.message}</span>
        <span className="opacity-80 text-right text-xs">{humanizeDate}</span>
      </Link>
    )
  }

  const renderNotify = () => {
    if (listNotify && listNotify?.length > 0) {
      return listNotify?.map((item, index) => {
        return renderItemNotify(item, index)
      })
    }

    return (<span className="italic text-xs text-center">No notify available</span>)
  }

  return (
    <div ref={notifyRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={openNotify}
        className="flex items-center justify-center h-full cursor-pointer realtive outline-none"
        onClick={() => setOpenNotify((prev) => !prev)}
      >
        <IoIosNotifications className={`text-3xl md:text-4xl origin-top transition-transform motion-reduce:transition-none ${openNotify ? 'rotate-18 duration-500 ease-swing' : 'rotate-0 duration-300 ease-out'} `} />
        {hasUnRead && <div className="bg-red-500 w-2 md:w-3 h-2 md:h-3 rounded-full absolute top-1 right-1 animate-ping">&nbsp;</div>}
      </button>

      <div
        role="menu"
        className={`absolute -right-20 md:right-0 top-full mt-2 z-20 min-w-56 md:min-w-80 max-w-56 md:max-w-80 p-2 flex flex-col gap-3 rounded border border-gray-200 bg-white shadow-2xl origin-top-right transition-all duration-300 ${openNotify ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible pointer-events-none'}`}
      >
        <div className="w-full h-full max-h-100 overflow-y-auto no-scrollbar flex flex-col gap-1 text-black">
          {renderNotify()}
        </div>
        {listNotify && listNotify?.length > 0 && <div className="font-bold text-center cursor-pointer">See All</div>}
      </div>
    </div>
  )
}

export default HeaderNotify
