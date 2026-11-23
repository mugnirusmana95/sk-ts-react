export type TProfile = {
  id: string
  userId: string
  firstName: string
  middleName?: string
  lastName?: string
  fullName: string
  phoneCodeId?: string
  phoneCode?: string
  phoneNumber?: string
  address?: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  isDeleted?: boolean
}
