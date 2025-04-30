'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '_config/routes'
import { Center, Spinner } from '@chakra-ui/react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace(APP_ROUTES.HOME)
  }, [router])

  return (
    <Center h={'100vh'}>
      <Spinner color={'primary.500'} />
    </Center>
  )
}
