'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '_config/routes'
import { GlobalLoader } from '_components/custom'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace(APP_ROUTES.HOME)
  }, [router])

  return <GlobalLoader loader />
}
