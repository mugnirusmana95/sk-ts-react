import axios from 'axios'
import { toast } from 'sonner'
import type { AxiosResponse } from 'axios'

import { useAuthStore } from '~/stores/auth'
import type { ApiResponse } from '~/lib/api-types'

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  withCredentials: true,
  headers: { 'X-Timezone': timezone },
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Someting went wrong'

    toast.error(message)

    if (axios.isAxiosError(error) && (error?.response?.data?.status === 401 || error.response?.status === 401)) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  },
)

export const unwrap = <T>(p: Promise<AxiosResponse<ApiResponse<T>>>) => p.then((r) => r.data)
