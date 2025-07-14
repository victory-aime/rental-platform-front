import { createStore } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'
import type { StoreApi } from 'zustand'

export type CacheState = {
  cache: Record<string, any>
  setCache: (key: string, data: any) => void
  getCache: <T>(key: string) => T | undefined
  removeCache: (key: string) => void
  clearAll: () => void
}

let store: StoreApi<CacheState> | null = null

export const initZustandCacheStore = (options: { storage: PersistStorage<CacheState> }) => {
  store = createStore<CacheState, [['zustand/persist', CacheState]]>(
    persist(
      (set, get) => ({
        cache: {},
        setCache: (key, data) => set((state) => ({ cache: { ...state.cache, [key]: data } })),
        getCache: (key) => get().cache[key],
        removeCache: (key) => {
          const newCache = { ...get().cache }
          delete newCache[key]
          return set({ cache: newCache })
        },
        clearAll: () => {
          set({ cache: {} })
          options.storage.removeItem?.('zustand-cache')
        },
      }),
      {
        name: 'zustand-cache',
        storage: options.storage,
      }
    )
  )
}

// Getter pour accéder au store
export const useZustandCacheStore = (): StoreApi<CacheState> => {
  if (!store) throw new Error('ZustandCache store not initialized')
  return store
}
