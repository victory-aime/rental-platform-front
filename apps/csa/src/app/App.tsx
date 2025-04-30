'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { Toaster } from '_components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ThemeProvider } from '_components/ui/provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionErrorModal } from '_components/custom/modal/ErrorModal'
import { TYPES } from 'platform-shared'

export const App = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={TYPES.QUERIES.queryClient}>
        <ThemeProvider>
          <SessionErrorModal session={session} />
          <Toaster />
          {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
