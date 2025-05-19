'use client'

import { useSession } from 'next-auth/react'
import { useSessionRefresh } from '_hooks/useSessionRefresh'
import { useSyncTokensWithContext } from '_hooks/useSyncSession'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StorageKey } from '_constants/StorageKeys'
import { Loader } from '_components/custom'
import { Center } from '@chakra-ui/react'

export const AppAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const { i18n } = useTranslation()
  const [isInitialized, setIsInitialized] = useState(false)
  const [ready, setReady] = useState(false)
  const savedLang = localStorage.getItem(StorageKey.LANGUAGE)

  useSessionRefresh()
  useSyncTokensWithContext()

  useEffect(() => {
    if (session?.access_token && session?.refresh_token) {
      setIsInitialized(true)
    } else {
      setIsInitialized(false)
    }

    const langToUse = savedLang ?? i18n.language

    if (typeof window !== 'undefined') {
      if (!savedLang) {
        localStorage.setItem(StorageKey.LANGUAGE, langToUse)
      }
    }

    if (i18n.language !== langToUse) {
      i18n.changeLanguage(langToUse).finally(() => setReady(true))
    } else {
      setReady(true)
    }
  }, [session, savedLang])

  if (!isInitialized || !ready) {
    return (
      <Center width={'100vw'} height={'100vh'}>
        <Loader loader />
      </Center>
    )
  }

  return <>{children}</>
}
