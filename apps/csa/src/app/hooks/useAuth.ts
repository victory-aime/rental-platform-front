import { useRouter } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { APP_ROUTES } from '_config/routes'
import { keycloakSessionLogOut } from '_hooks/logout'
import { useGlobalLoader } from '_context/loaderContext'
import { StorageKey } from '_constants/StorageKeys'
import { ZUSTAND } from 'rise-core-frontend'

export const useAuth = () => {
  const router = useRouter()
  const { showLoader, hideLoader, isLoading } = useGlobalLoader()

  const logout = async () => {
    try {
      showLoader()
      const store = ZUSTAND.useZustandCacheStore()
      localStorage.removeItem(StorageKey.OTP_REQUIRED)
      localStorage.removeItem(StorageKey.CACHE)

      setTimeout(() => {
        store.getState().clearAll()
      }, 10)

      await keycloakSessionLogOut().then(() => store.getState().clearAll())

      await signOut({ redirect: false })

      router.replace(APP_ROUTES.SIGN_IN)
    } finally {
      hideLoader()
    }
  }

  const login = async (options?: { otpRequired?: boolean; callbackUrl?: string }) => {
    try {
      showLoader()
      if (options?.otpRequired) {
        localStorage.setItem(StorageKey.OTP_REQUIRED, 'true')
      }

      await signIn('keycloak', {
        callbackUrl: options?.callbackUrl ?? APP_ROUTES.HOME,
      })
    } finally {
      hideLoader()
    }
  }

  return { logout, login, isLoading }
}
