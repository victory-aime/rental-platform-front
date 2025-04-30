import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

export const useSessionRefresh = (interval = 25 * 60 * 1000) => {
  const { update } = useSession()

  useEffect(() => {
    const id = setInterval(() => {
      update().catch((e) => {
       
        signIn('keycloak')
      })
    }, interval)

    return () => clearInterval(id)
  }, [update, interval])
}
