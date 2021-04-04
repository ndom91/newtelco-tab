import type { NextApiRequest, NextApiResponse } from 'next'
import { inject } from '../ioc'
import type { IAuthConfig } from './auth.config.interface'
import { AUTH_CONFIG } from './auth.module-keys'
import { getSession } from 'next-auth/client'

const AuthMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  restrict = true,
  config = inject<IAuthConfig>(AUTH_CONFIG),
): Promise<void> => {
  const session = await getSession({ req })

  if (restrict && !session?.accessToken) {
    res.status(401)
  }

  config.accessToken = session?.accessToken ?? null
  // @ts-ignore
  config.refreshToken = session?.refreshToken ?? null
}

export { AuthMiddleware }
