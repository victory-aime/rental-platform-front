'use client'
import { Center, Spinner } from '@chakra-ui/react'
import { APP_ROUTES } from '_config/routes'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const SignIn = () => {
  const callbackUrl = useSearchParams()?.get('callbackUrl') || APP_ROUTES.HOME
  const router = useRouter()
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    signIn('keycloak', { callbackUrl }).then(() => setLoader(false))
  }, [])

  return (
    <Center h={'100vh'} w={'100vw'}>
      {loader && <Spinner animationDuration="0.4s" size={'xl'} color={'primary.500'} borderWidth={'3px'} />}
    </Center>
  )
}
