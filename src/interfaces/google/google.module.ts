import { ContainerModule } from 'inversify'
import { GoogleConfig } from './google.config'
import type { IGoogleConfig } from './google.config.interface'
import { GoogleDriveService } from './google-drive.service'
import type { IGoogleDriveService } from './google-drive.service.interface'
import { GOOGLE_CONFIG, GOOGLE_DRIVE_SERVICE } from './google.module-keys'

const GoogleModule = new ContainerModule((bind) => {
  bind<IGoogleConfig>(GOOGLE_CONFIG).to(GoogleConfig).inSingletonScope()
  bind<IGoogleDriveService>(GOOGLE_DRIVE_SERVICE).to(GoogleDriveService)
})

export { GoogleModule }
