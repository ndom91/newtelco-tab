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

const fallbackFileIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z"/></svg>'

const GDriveFile = ({ file }: FileProps): React.ReactElement => {
  return (
    <div tw=" py-1">
      <a tw="flex items-start" href={`https://drive.google.com/file/d/${file.id}`} target="_blank" rel="noopener noreferer">
        <span tw="text-newtelco-500 p-2">
          <img tw="text-white" src={`data:image/svg+xml;utf8,${iconMap[file.mimeType] ?? fallbackFileIcon}`} />
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
