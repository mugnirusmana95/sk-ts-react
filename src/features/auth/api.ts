import { http, unwrap } from '~/lib/axios'
import type { ApiResponse } from '~/lib/api-types'
import type { TLogin } from '~/features/auth/types'
import { type TLoginSchema } from '~/validators/auth'

export const authApi = {
  login: (payload: TLoginSchema) =>
    unwrap(http.post<ApiResponse<TLogin>>('/v1/auth/login', payload)),

  logout: () => unwrap(http.post<ApiResponse<null>>('/v1/auth/logout')),
}
