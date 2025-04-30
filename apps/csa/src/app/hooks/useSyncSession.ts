import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { decrypted } from '_utils/crypt'
import { applicationContext } from '_context/global-state'

export const useSyncTokensWithContext = () => {
  const { data: session } = useSession()
  const lastAccessTokenRef = useRef<string | null>(null)

  useEffect(() => {
    if (!session?.access_token || !session?.refresh_token) return

    const accessToken = decrypted(session.access_token)
    const refreshToken = decrypted(session.refresh_token)

    if (accessToken !== lastAccessTokenRef.current) {
      applicationContext.setToken(accessToken)
      applicationContext.setRefreshToken(refreshToken)
      lastAccessTokenRef.current = accessToken
    }
  }, [session])
}
