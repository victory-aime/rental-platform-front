import { useZustandCacheStore } from './store'

export class ZustandCache {
  static set<T>(key: string, data: T) {
    const store = useZustandCacheStore()
    store.getState().setCache(key, data)
  }

  static get<T>(key: string): T | undefined {
    const store = useZustandCacheStore()
    return store.getState().getCache<T>(key)
  }

  static remove(key: string) {
    const store = useZustandCacheStore()
    store.getState().removeCache(key)
  }

  static clearAll() {
    const store = useZustandCacheStore()
    store.getState().clearAll()
  }

  static subscribe<T = unknown>(key: string, callback: (data: T | undefined) => void): () => void {
    const store = useZustandCacheStore()
    return store.subscribe((state: { cache: Record<string, unknown> }) => {
      callback(state.cache[key] as T | undefined)
    })
  }
}
