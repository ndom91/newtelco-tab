// https://github.com/nextauthjs/next-auth/issues/1162
// Google Interfaces: https://github.com/Marcus-Rise/BuyList/tree/master/src/server/google
import type { User, NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import type { NextApiHandler } from 'next'
import type { IGoogleConfig } from '../../../interfaces/google'
import { GOOGLE_CONFIG } from '../../../interfaces/google'
import { inject } from '../../../interfaces/ioc'

type GenericObject<T = {}> = T & {
  [key: string]: any
}

interface AuthPayload {
  user: User
  accessToken: string
  accessTokenExpires: number
  refreshToken: string
  error?: string
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (payload: AuthPayload, clientId: string, clientSecret: string): Promise<AuthPayload> => {
  try {
    const url = new URL('https://oauth2.googleapis.com/token')
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('client_secret', clientSecret)
    url.searchParams.set('grant_type', 'refresh_token')
    url.searchParams.set('refresh_token', payload.refreshToken)

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshToken = await response.json()

    if (!response.ok) {
      throw refreshToken
    }

    // Give a 10 sec buffer
    const now = new Date()
    const accessTokenExpires = now.setSeconds(now.getSeconds() + parseInt(refreshToken.expires_in) - 10)

    return {
      ...payload,
      accessToken: refreshToken.access_token,
      accessTokenExpires,
      refreshToken: refreshToken.refresh_token,
    }
  } catch (error) {
    console.error(error)

    return {
      ...payload,
      error: 'RefreshAccessTokenError',
    }
  }
}

const AuthHandler: NextApiHandler = (req, res, googleConfig = inject<IGoogleConfig>(GOOGLE_CONFIG)) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.activity',
    'https://www.googleapis.com/auth/directory.readonly',
  ]
  const JWT_SECRET = String(process.env.NEXTAUTH_JWT_SECRET)
  const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authorizationUrl.searchParams.set('prompt', 'consent') // required to get refresh token
  authorizationUrl.searchParams.set('access_type', 'offline')
  authorizationUrl.searchParams.set('response_type', 'code')
  authorizationUrl.searchParams.set('login_hint', '@newtelco.de')

  const options: NextAuthOptions = {
    providers: [
      Providers.Google({
        clientId: googleConfig.clientId,
        clientSecret: googleConfig.clientSecret,
        authorizationUrl: authorizationUrl.toString(),
        scope: scopes.join(' '),
      }),
    ],
    secret: JWT_SECRET,
    jwt: {
      encryption: true,
      secret: JWT_SECRET,
    },
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
      // @ts-ignore
      async jwt(payload: AuthPayload, user: User, account: GenericObject): Promise<AuthPayload> {
        let res: AuthPayload

        const now = Date.now()

        // Signing in
        if (account && user) {
          const accessToken = account.accessToken
          const refreshToken = account.refreshToken

          res = {
            accessToken,
            accessTokenExpires: account.accessTokenExpires,
            refreshToken,
            user,
          }
        } else if (payload.accessTokenExpires === null || now < payload.accessTokenExpires) {
          // Subsequent use of JWT, the user has been logged in before
          // access token has not expired yet
          res = payload
        } else {
          // access token has expired, try to update it
          console.log('**** REFRESHING TOKEN ****')
          console.log(payload)
          res = await refreshAccessToken(payload, googleConfig.clientId, googleConfig.clientSecret)
        }

        return res
      },
      // @ts-ignore
      async session(_, payload: GenericObject): Promise<GenericObject> {
        return Promise.resolve(payload)
      },
    },
  }

  return NextAuth(req, res, options)
}

export default AuthHandler
