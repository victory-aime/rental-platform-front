'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { SessionErrorModal } from './auth/components/ErrorModal'

export const App = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  return <SessionProvider session={session}>{session?.error === 'RefreshAccessTokenError' ? <SessionErrorModal session={session} /> : children}</SessionProvider>
}
