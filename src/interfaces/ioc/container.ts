import 'reflect-metadata'
import { Container } from 'inversify'
import { GoogleModule } from '../google'

const container = new Container()

container.load(GoogleModule)

export { container }
