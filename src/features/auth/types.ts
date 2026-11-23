import type { TProfile } from '~/features/profile/types'
import type { TRole } from '~/features/role/types'

export type TLogin = {
  id: string
  email: string
  roleId: string
  status: number
  statusText: string
  createdAt: string
  updatedAt: string
  role: TRole
  profile: TProfile
}
