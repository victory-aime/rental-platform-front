'use client'
import { Loader } from '_components/custom'
import { APP_ROUTES } from '_config/routes'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const SignIn = () => {
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    signIn('keycloak', { callbackUrl }).then(() => setLoader(false))
  }, [])

  return <Loader loader={loader} />
}
