import React from 'react'
import { iconMap } from '../utils/IconMap'

type FileProps = {
  file: {
    id: string
    name: string
    kind: string
    mimeType: string
    modifiedTime: string
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
              <span tw="font-medium mr-1">{file.name}</span>
            </p>
            <p tw="font-thin text-gray-500">{new Date(file.modifiedTime).toLocaleString()}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    </div>
  )
}

export default GDriveFile
