'use client'

import { useSession } from 'next-auth/react'
import { useSessionRefresh } from '_hooks/useSessionRefresh'
import { useSyncTokensWithContext } from '_hooks/useSyncSession'
import React, { useState, useEffect } from 'react'
import { GlobalLoader } from '_components/custom'

export const AppAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [isInitialized, setIsInitialized] = useState(false)

  useSessionRefresh()
  useSyncTokensWithContext()

  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      setIsInitialized(true)
    } else {
      setIsInitialized(false)
    }
  }, [session])

  if (!isInitialized) {
    return <GlobalLoader loader />
  }

  return <>{children}</>
}
