import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    access_token?: string
    refresh_token?: string
    sessionId?:string
    keycloakId?: string
    id_token?: string
    roles?: string[]
    error?: string
  }

  interface JWT {
    access_token?: string
    sid?:string
    id_token?: string
    refresh_token?: string
    expires_at?: number
    decoded?: any
    error?: string
  }
}
