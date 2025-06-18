'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MODULES_CARS_ROUTES, MODULES_HOTEL_ROUTES } from './routes'
import { GlobalLoader } from '_components/custom/loader/Loader'

const roleToDashboardMap: Record<string, string> = {
  AUTOMOBILISTE: MODULES_CARS_ROUTES.DASHBOARD,
  HOTELIER: MODULES_HOTEL_ROUTES.DASHBOARD,
  ADMIN: '/admin/dashboard',
}

export default function ModulesRedirectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    const userRoles: string[] = session?.roles || []
    const targetDashboard = userRoles.map((role) => roleToDashboardMap[role]).find(Boolean)
    if (targetDashboard) {
      router.replace(targetDashboard)
    } else {
      router.replace('/unauthorized')
    }
  }, [session, status, router])

  return <GlobalLoader loader />
}
