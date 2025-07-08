'use client'
import React, { ReactNode, useEffect } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { TYPES } from 'rental-platform-shared'
import { applicationContext } from '_context/global-state'
import { AppContext } from '_context/app.context'

export default function GlobalApplicationProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storage = {
      getItem: async (key: string) => {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : null
      },
      setItem: async (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
      },
      removeItem: async (key: string) => {
        localStorage.removeItem(key)
      },
    }

    try {
      TYPES.ZUSTAND.useZustandCacheStore()
    } catch {
      TYPES.ZUSTAND.initZustandCacheStore({ storage })
    }
  }, [])

  return (
    <QueryClientProvider client={TYPES.QUERIES.queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppContext.Provider value={applicationContext}>{children}</AppContext.Provider>
    </QueryClientProvider>
  )
}
