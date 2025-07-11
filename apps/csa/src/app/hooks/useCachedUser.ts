import { useSyncExternalStore } from 'react'
import { CommonModule } from 'rental-platform-state'

/**
 * Hook pour lire le user depuis le cache Zustand de manière réactive,
 * sans déclencher de boucle infinie ou de state React inutile.
 */
export function useCachedUser() {
  return useSyncExternalStore(
    CommonModule.UserModule.UserCache.subscribe,
    CommonModule.UserModule.UserCache.getUser
  )
}
