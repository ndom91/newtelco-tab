import type { Container } from 'inversify'
import { container } from './container'

const inject = <T>(provider: symbol, iocContainer: Container = container): T => {
  return iocContainer.get<T>(provider)
}

export { inject }
