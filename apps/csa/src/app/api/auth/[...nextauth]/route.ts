import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { jwtDecode } from 'jwt-decode'
import { refreshAccessToken } from '_utils/auth'
import { encrypted } from '_utils/crypt'

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  jwt: {
    encrypt: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }: { token: any; account?: any }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000)

      if (account) {
        const decoded = jwtDecode<{ [key: string]: any }>(account.access_token)
        token.decoded = decoded
        token.access_token = account.access_token
        token.id_token = account.id_token
        token.expires_at = account.expires_at
        token.refresh_token = account.refresh_token
        token.sub = account?.sub
        token.sessionId = decoded.sid
        return token
      } else if (nowTimeStamp < token.expires_at - 180) {
        return token
      } else {
        try {
          const refreshedToken = await refreshAccessToken(token?.refresh_token)
          const refreshedDecoded = jwtDecode<{ [key: string]: any }>(refreshedToken.access_token)

          return {
            ...token,
            access_token: refreshedToken.access_token,
            refresh_token: refreshedToken.refresh_token,
            id_token: refreshedToken.id_token,
            expires_at: refreshedToken.expires_at,
            decoded: refreshedDecoded,
            sessionId: refreshedDecoded.sid,
          }
        } catch (error) {
          console.error('Error refreshing access token', error)
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      session.access_token = token.access_token ? encrypted(token.access_token) : null
      session.refresh_token = token.refresh_token ? encrypted(token.refresh_token) : null
      session.id_token = token.id_token ? encrypted(token.id_token) : null
      session.roles = token.decoded?.realm_access?.roles ?? []
      session.keycloakId = token.decoded?.sub ?? null
      session.sessionId = token.sessionId ?? null
      session.error = token.error
      return session
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
