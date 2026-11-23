import { create, type StateCreator } from 'zustand'
import { devtools, persist, type PersistOptions } from 'zustand/middleware'

const allowedDevtoolAppMode = ['local', 'development']
const DEVTOOLS_ENABLED = allowedDevtoolAppMode.includes(import.meta.env.VITE_APP_MODE)

type StoreOptions<T> = {
  name: string
  devtools?: boolean
  persist?: boolean | Partial<PersistOptions<T, Partial<T>>>
}

type Initializer<T> = StateCreator<T, [['zustand/devtools', never]], []>

export function createStore<T>(
  initializer: Initializer<T>,
  { name, devtools: withDevtools = true, persist: withPersist = false }: StoreOptions<T>,
) {
  let creator = initializer as unknown as StateCreator<T, [], []>

  if (withPersist) {
    const options = typeof withPersist === 'object' ? withPersist : {}
    creator = persist(creator, { name, ...options }) as unknown as StateCreator<T, [], []>
  }

  if (withDevtools) {
    creator = devtools(creator, {
      name,
      enabled: DEVTOOLS_ENABLED,
    }) as unknown as StateCreator<T, [], []>
  }

  return create<T>()(creator)
}
