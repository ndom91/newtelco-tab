import React from 'react'

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
    <div>
      <a href={`https://drive.google.com/file/d/${file.id}`} target="_blank" rel="noopener noreferer">
        <span>{file.name}</span>
      </a>
    </div>
  )
}

export default GDriveFile
