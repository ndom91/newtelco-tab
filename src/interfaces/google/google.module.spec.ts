import 'reflect-metadata'
import { Container } from 'inversify'
import { GoogleModule } from './google.module'
import { GoogleConfig } from './google.config'
import { AuthModule } from '../auth'
import { GoogleDriveService } from './google-drive.service'
import { GOOGLE_CONFIG, GOOGLE_DRIVE_SERVICE } from './google.module-keys'

describe('GoogleModule', () => {
  test('GoogleConfig', () => {
    const container = new Container()
    container.load(AuthModule, GoogleModule)

    expect(container.get(GOOGLE_CONFIG)).toBeInstanceOf(GoogleConfig)
  })
  test('GoogleDriveService', () => {
    const container = new Container()
    container.load(AuthModule, GoogleModule)

    expect(container.get(GOOGLE_DRIVE_SERVICE)).toBeInstanceOf(GoogleDriveService)
  })
})
