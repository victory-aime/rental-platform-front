// zustandCacheStore.ts

import { TYPES } from 'rental-platform-shared'

const storage = {
  getItem: (key: string) => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  },
}

if (typeof window !== 'undefined') {
    console.log('store init')
  TYPES.ZUSTAND.initZustandCacheStore({ storage })
}
