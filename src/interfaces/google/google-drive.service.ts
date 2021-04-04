import { google } from 'googleapis'
import type { IError, IFileInfo, IGoogleDriveService } from './google-drive.service.interface'
import type { IGoogleConfig } from './google.config.interface'
import type { drive_v3 } from 'googleapis'
import type { IAuthConfig } from '../auth'
import { AUTH_CONFIG } from '../auth'
import { inject, injectable } from 'inversify'
import { GOOGLE_CONFIG } from './google.module-keys'
import path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as uuid from 'uuid'
import type { GaxiosError } from 'gaxios'

@injectable()
class GoogleDriveService implements IGoogleDriveService {
  constructor(
    @inject(GOOGLE_CONFIG) private readonly config: IGoogleConfig,
    @inject(AUTH_CONFIG) private readonly authConfig: IAuthConfig,
  ) {}

  private get drive(): drive_v3.Drive {
    const auth = new google.auth.OAuth2({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
    })
    auth.forceRefreshOnFailure = true
    auth.setCredentials({
      access_token: this.authConfig.accessToken,
      refresh_token: this.authConfig.refreshToken,
    })
    auth.forceRefreshOnFailure = true

    return google.drive({ auth, version: 'v3' })
  }

  private static parseError(e: GaxiosError): IError {
    const error = e?.stack ?? e?.response?.data?.error

    return { code: error?.code ?? 500, text: String(error ?? e) }
  }

  isError(obj: unknown): obj is IError {
    return typeof obj === 'object' && obj !== null && 'code' in obj && 'text' in obj
  }

  async writeFile(name: string, mimeType: string, data: string, update?: boolean): Promise<IFileInfo | IError> {
    let res: IFileInfo | IError = { code: 500, text: 'Unexpected error on writing file' }

    if (update) {
      const list = await this.getFileList()

      if (!this.isError(list)) {
        const fileId = list.find((i) => i.name === name)?.id

        if (fileId) {
          res = await this.updateFile(fileId, data)
        } else {
          res = await this.createFile(name, mimeType, data)
        }
      }
    } else {
      res = await this.createFile(name, mimeType, data)
    }

    return res
  }

  async getFileList(): Promise<IFileInfo[] | IError> {
    let res: IFileInfo[] | IError = []

    await this.drive.files
      .list({
        // todo return
        // spaces: "appDataFolder"
      })
      .then((data) => {
        const content = data.data
        res = content.files
          ?.map<IFileInfo>((i) => ({ id: i.id ?? '', name: i.name ?? '' }))
          ?.filter((i) => i.id && i.name) ?? {
          code: 404,
          text: 'No files',
        }
      })
      .catch((e) => {
        res = GoogleDriveService.parseError(e)
      })

    return res
  }

  async readFile(id: string): Promise<IError | string> {
    const file = await this.drive.files.get({ fileId: id, alt: 'media' }, { responseType: 'stream' })

    return new Promise<string>((resolve, reject) => {
      const filePath = path.join(os.tmpdir(), uuid.v4())
      const dest = fs.createWriteStream(filePath)

      file.data
        .on('end', () => {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              const error: IError = { code: err.code ? Number(err.code) : 500, text: err.message }
              reject(error)
            } else {
              resolve(data)
            }
          })
        })
        .on('error', (err) => {
          const error: IError = { code: 500, text: err.message }
          reject(error)
        })
        .pipe(dest)
    })
  }

  async createFile(name: string, mimeType: string, data: string): Promise<IFileInfo | IError> {
    let res: IFileInfo | IError = { code: 500, text: 'Unexpected error on creating file' }

    await this.drive.files
      .create({
        requestBody: {
          name,
          // todo return
          // parents: ["appDataFolder"]
        },
        media: { mimeType, body: data },
      })
      .then((data) => {
        if (data.data.id && data.data.name) {
          res = {
            id: data.data.id,
            name: data.data.name,
          }
        } else {
          res = {
            code: 500,
            text: 'No file id',
          }
        }
      })
      .catch((e) => {
        res = GoogleDriveService.parseError(e)
      })

    return res
  }

  async updateFile(id: string, data: string): Promise<IFileInfo | IError> {
    let res: IFileInfo | IError = { code: 500, text: 'Unexpected error on updating file' }

    await this.drive.files
      .update({
        fileId: id,
        requestBody: {
          // todo return
          // parents: ["appDataFolder"]
        },
        media: { body: data },
      })
      .then((data) => {
        if (data.data.id && data.data.name) {
          res = {
            id: data.data.id,
            name: data.data.name,
          }
        } else {
          res = {
            code: 500,
            text: 'No file id',
          }
        }
      })
      .catch((e) => {
        res = GoogleDriveService.parseError(e)
      })

    return res
  }
}

export { GoogleDriveService }
