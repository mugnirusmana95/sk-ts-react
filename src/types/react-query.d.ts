import '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '~/lib/api-types'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ApiErrorResponse>
  }
}
