import React from 'react'
import { iconMap } from '../utils/IconMap'

type FileProps = {
  file: {
    id: string
    name: string
    kind: string
    mimeType: string
  }
}

const GDriveFile = ({ file }: FileProps): React.ReactElement => {
  return (
    <div tw=" py-1">
      <a tw="flex items-start" href={`https://drive.google.com/file/d/${file.id}`} target="_blank" rel="noopener noreferer">
        <span tw="text-newtelco-500 p-2">
          <img tw="text-white" src={`data:image/svg+xml;utf8,${iconMap[file.mimeType]}`} />
        </span>
        <div tw="flex items-center w-full justify-between">
          <div tw="flex text-sm flex-col w-full ml-2 items-start justify-between">
            <p tw="text-white">
              <span tw="font-bold mr-1">{file.name}</span>
            </p>
            <p tw="text-gray-300">DATE</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default GDriveFile
