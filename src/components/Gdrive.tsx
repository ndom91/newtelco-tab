import React, { useEffect, useState } from 'react'
// import gapi from 'googleapis'

const GDriveLatest: React.FC = () => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    // gapi.client.drive.files
    //   .list({
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name)',
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
  })
  return (
    <div tw="p-4 h-full">
      <div tw="border-2 border-gray-500 px-4 py-6 rounded-lg">
        <div tw="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="36"
            width="36"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <h2 tw="font-medium text-3xl text-white">Google Drive</h2>
        </div>
        <div onClick={() => setFiles(['test'])} tw="">
          {files && files.map((file) => <span>{file.name}</span>)}
        </div>
      </div>
    </div>
  )
}

export default GDriveLatest
