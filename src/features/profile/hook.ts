import { useQuery } from '@tanstack/react-query'

import { profileApi } from '~/features/profile/api'
import { useAuthStore } from '~/stores/auth-store'

export const useGetProfile = () => {
  const login = useAuthStore((s) => s.login)

  return useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const response = await profileApi.get()
      login(response?.data)
      return response?.data?.profile
    },
    staleTime: 60_000,
  })
}
