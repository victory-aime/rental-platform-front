import { useEffect, useState } from 'react'
import { CommonModule } from 'rental-platform-state'

/**
 * Hook pour récupérer le user depuis le cache et rester à jour si cache change
 */

export function useCachedUser() {
  const [user, setUser] = useState(() => CommonModule.UserModule.UserCache.getUser())

  useEffect(() => {
    const unsubscribe = CommonModule.UserModule.UserCache.subscribe(setUser)
    return () => unsubscribe()
  }, [])

  return user
}
