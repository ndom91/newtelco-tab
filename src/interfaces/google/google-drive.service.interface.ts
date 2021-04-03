interface IError {
  code: number
  text: string
}

interface IFileInfo {
  id: string
  name: string
}

interface IGoogleDriveService {
  writeFile(name: string, mimeType: string, data: string, update?: boolean): Promise<IFileInfo | IError>

  getFileList(): Promise<IFileInfo[] | IError>

  isError(obj: unknown): obj is IError

  readFile(id: string): Promise<IError | string>
}

export type { IGoogleDriveService, IError, IFileInfo }
