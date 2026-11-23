import type { TLogin } from '~/features/auth/types'
import { createStore } from '~/lib/create-store'

type AuthState = {
  auth: TLogin | null
  login: (auth: TLogin) => void
  logout: () => void
}

export const useAuthStore = createStore<AuthState>(
  (set) => ({
    auth: null,
    login: (auth) => set({ auth }, undefined, 'auth/login'),
    logout: () => set({ auth: null }, undefined, 'auth/logout'),
  }),
  {
    name: 'authStore',
    persist: {
      name: 'auth',
      partialize: (state) => ({ auth: state.auth }),
    },
  },
)

export const useIsAuthed = () => useAuthStore((s) => !!s.auth)
