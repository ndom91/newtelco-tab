import { ContainerModule } from 'inversify'
import { AuthConfig } from './auth.config'
import type { IAuthConfig } from './auth.config.interface'
import { AUTH_CONFIG } from './auth.module-keys'

const AuthModule = new ContainerModule((bind) => {
  bind<IAuthConfig>(AUTH_CONFIG).to(AuthConfig).inSingletonScope()
})

export { AuthModule }
