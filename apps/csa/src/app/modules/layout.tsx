import { App } from '../App'
import { Layout } from '../layout/Layout'
import { getServerSession } from 'next-auth'
import { authOptions } from '_authOptions/auth/[...nextauth]/route'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <App session={session}>
      <Layout session={session}>{children}</Layout>
    </App>
  )
}
