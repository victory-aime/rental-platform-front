'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { Toaster } from '_components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionErrorModal } from '_components/custom/modal/ErrorModal'
import { TYPES } from 'rental-platform-shared'

export const App = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={TYPES.QUERIES.queryClient}>
        <SessionErrorModal session={session} />
        <Toaster />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
