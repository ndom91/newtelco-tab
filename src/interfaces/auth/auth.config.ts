import type { IAuthConfig } from './auth.config.interface'
import { injectable } from 'inversify'

@injectable()
class AuthConfig implements IAuthConfig {
  accessToken: string | null = null
  refreshToken: string | null = null
}

export { AuthConfig }
