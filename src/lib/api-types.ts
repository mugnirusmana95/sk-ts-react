export type ApiResponse<T = null> = {
  status: number
  isSuccess: boolean
  message: string
  data: T
}

export type ApiFieldError = {
  field: string
  message: string
}

export type ApiErrorResponse = {
  status: number
  isSuccess: boolean
  message: string
  data: null
  field?: {
    object: Record<string, string>
    array: ApiFieldError[]
  }
}
