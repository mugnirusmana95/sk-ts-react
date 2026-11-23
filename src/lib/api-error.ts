import axios from 'axios'
import type { ApiErrorResponse, ApiFieldError } from '~/lib/api-types'

export type ParsedApiError = {
  status?: number
  message: string
  field?: {
    object: Record<string, string>
    array: ApiFieldError[]
  }
}

export function parseApiError(err: unknown, fallback = 'Terjadi kesalahan'): ParsedApiError {
  if (!axios.isAxiosError<ApiErrorResponse>(err)) {
    return { message: err instanceof Error ? err.message : fallback, field: undefined }
  }

  if (!err.response) {
    return { message: 'Tidak dapat terhubung ke server', field: undefined }
  }

  const body = err.response.data

  const field = body?.field

  return {
    status: err.response.status,
    message: body?.message ?? fallback,
    field,
  }
}
