import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuthStore } from '~/stores/auth-store'
import { authApi } from '~/features/auth/api'

export const useLogin = () => {
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationKey: ['submit-login'],
    mutationFn: authApi.login,
    onSuccess: (response) => {
      toast.success(response?.message ?? 'Login success')
      login(response?.data)
    },
  })
}

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout)

  return useMutation({
    mutationKey: ['submit-logout'],
    mutationFn: authApi.logout,
    onSuccess: (response) => {
      toast.success(response?.message ?? 'Logout success')
      logout()
    },
  })
}
