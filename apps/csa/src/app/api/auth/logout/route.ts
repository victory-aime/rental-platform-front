import { getIdToken } from '_utils/auth'
import { authOptions } from '../[...nextauth]/route'
import { getServerSession } from 'next-auth'
import axios from 'axios'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (session) {
    const idToken = await getIdToken()
    const postLogoutRedirectUri = process.env.NEXTAUTH_URL || 'http://localhost:8070'

    if (!idToken) {
      return new Response('ID token is missing or invalid.', { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_LOGOUT_URL) {
      return new Response('LOGOUT_URL is not configured.', { status: 500 })
    }

    try {
      const logoutUrl = `${process.env.NEXT_PUBLIC_LOGOUT_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`
      await axios.get(logoutUrl)
    } catch (err) {
      return new Response('Logout request failed.', { status: 400 })
    }
  }
  return new Response(null, { status: 200 })
}
