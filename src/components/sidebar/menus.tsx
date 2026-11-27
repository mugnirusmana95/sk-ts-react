import type { IconType } from 'react-icons'
import { CiViewTable } from "react-icons/ci"
import { CiBoxes } from "react-icons/ci"

export type TChildMenu = {
  id: string
  label: string
  path?: string
  badge?: number | null
  permission?: string
  children?: TChildMenu[]
}

export type TMenu = TChildMenu & {
  icon?: IconType
}

export const useListMenu = () => {
  const listMenus: TMenu[] = []
  listMenus.push(
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: CiViewTable,
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: CiViewTable,
    },
    {
      id: 'menu-level',
      label: 'Menu Level',
      icon: CiBoxes,
      children: [
        {
          id: 'menu-level-1',
          label: 'Level 1',
          path: '/menu-level/level-1',
          children: [
            {
              id: 'menu-level-1-1-a',
              label: 'Level 2',
              path: '/menu-level/level-2',
              permission: 'permission.read',
            },
            {
              id: 'menu-level-1-1-b',
              label: 'Level 2',
              path: '/menu-level/level-2',
              children: [
                {
                  id: 'menu-level-1-1-1-a',
                  label: 'Level 3',
                  path: '/menu-level/level-3',
                  permission: 'permission.read',
                },
                {
                  id: 'menu-level-1-1-1-b',
                  label: 'Level 3',
                  permission: 'permission.read',
                  children: [
                    {
                      id: 'menu-level-1-1-1-1',
                      label: 'Level 4',
                      path: '/profile',
                      permission: 'permission.read',
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'menu-level-2',
          label: 'Permission',
          path: '/menu-level/level-1',
          permission: 'permission.read',
          badge: 2,
        },
      ],
    }
  )

  return listMenus
}