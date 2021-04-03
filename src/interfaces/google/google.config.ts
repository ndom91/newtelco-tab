import type { IGoogleConfig } from './google.config.interface'
import { injectable } from 'inversify'

@injectable()
class GoogleConfig implements IGoogleConfig {
  readonly clientId: string
  readonly clientSecret: string

  constructor() {
    this.clientId = String(process.env.GOOGLE_CLIENT_ID)
    this.clientSecret = String(process.env.GOOGLE_CLIENT_SECRET)
  }
}

export { GoogleConfig }
