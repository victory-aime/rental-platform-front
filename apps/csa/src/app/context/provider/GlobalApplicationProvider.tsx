'use client'
import React, { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { TYPES } from 'rental-platform-shared'
import { applicationContext } from '_context/global-state'
import { AppContext } from '_context/app.context'

export default function GlobalApplicationProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={TYPES.QUERIES.queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppContext.Provider value={applicationContext}>{children}</AppContext.Provider>
    </QueryClientProvider>
  )
}
