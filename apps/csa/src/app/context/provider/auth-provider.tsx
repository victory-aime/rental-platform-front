'use client'

import { useSession } from 'next-auth/react'
import { useSessionRefresh } from '_hooks/useSessionRefresh'
import { useSyncTokensWithContext } from '_hooks/useSyncSession'
import React, { useState, useEffect } from 'react'
import { Loader } from '_components/custom'
import { Center } from '@chakra-ui/react'

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
    return (
      <Center width={'100vw'} height={'100vh'}>
        <Loader loader />
      </Center>
    )
  }

  return <>{children}</>
}
