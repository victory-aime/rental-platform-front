import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAuth } from './useAuth'

export const useSessionRefresh = (interval = 25 * 60 * 1000) => {
  const { update } = useSession()
  const { login } = useAuth()

  useEffect(() => {
    const id = setInterval(() => {
      update().catch((e) => {
        login()
      })
    }, interval)

    return () => clearInterval(id)
  }, [update, interval])
}
