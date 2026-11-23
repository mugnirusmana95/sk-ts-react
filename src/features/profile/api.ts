import { http, unwrap } from '~/lib/axios'
import type { ApiResponse } from '~/lib/api-types'
import type { TLogin } from '~/features/auth/types'
import type { TProfile } from '~/features/profile/types'

export const profileApi = {
  get: () => unwrap(http.get<ApiResponse<TLogin>>('/v1/profile')),
  update: (payload: TProfile) => unwrap(http.post<ApiResponse<TLogin>>('/v1/profile', payload)),
}
