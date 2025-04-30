'use client'

import { useSession } from 'next-auth/react'
import { Spinner, Center } from '@chakra-ui/react'
import { useSessionRefresh } from '_hooks/useSessionRefresh'
import { useSyncTokensWithContext } from '_hooks/useSyncSession'
import { useState, useEffect } from 'react'

export const AppAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [isInitialized, setIsInitialized] = useState(false)

  useSessionRefresh()
  useSyncTokensWithContext()

  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      try {
        setIsInitialized(true)
      } catch (error) {
        setIsInitialized(false)
      }
    } else {
      setIsInitialized(false)
    }
  }, [session])

  if (!isInitialized) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner animationDuration="0.4s" size="xl" color="primary.500" borderWidth="3px" />
      </Center>
    )
  }

  return <>{children}</>
}
