'use client'
import React, { ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { QUERIES } from 'rise-core-frontend'
import { applicationContext } from '_context/global-state'
import { AppContext } from '_context/app.context'
import '../zustand-store'

export default function GlobalApplicationProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={QUERIES.queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppContext.Provider value={applicationContext}>{children}</AppContext.Provider>
    </QueryClientProvider>
  )
}
