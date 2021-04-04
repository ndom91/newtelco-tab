import type { User } from 'next-auth'

interface AuthPayload {
  user: User
  accessToken: string
  accessTokenExpires: number
  refreshToken: string
  error?: string
}

export type { AuthPayload }
