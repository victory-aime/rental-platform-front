import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export async function refreshAccessToken(refresh_token: any) {
  try {
    const resp = await axios.post(
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_TOKEN_URL!,
      new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    const refreshToken = resp.data
    return {
      ...refresh_token,
      access_token: refreshToken?.access_token,
      decoded: jwtDecode(refreshToken?.access_token),
      id_token: refreshToken?.id_token,
      keycloakId: refreshToken?.decode?.sub,
      expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
      refresh_token: refreshToken?.refresh_token,
    }
  } catch {}
}
