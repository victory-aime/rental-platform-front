import { authOptions } from '_authOptions/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { decrypted } from '../crypt'

export async function getAccessToken() {
  const session = await getServerSession(authOptions)
  if (session) {
    return decrypted(session.access_token)
  }
  return null
}

export async function getIdToken() {
  const session = await getServerSession(authOptions)
  if (session) {
    const idTokenDecrypted = decrypted(session.id_token)
    return idTokenDecrypted
  }
  return null
}
