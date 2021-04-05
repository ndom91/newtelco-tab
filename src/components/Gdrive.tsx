import React, { useEffect, useState } from 'react'
import GdriveFile from '@/components/GdriveFile'
import Loader from '@/components/Loader'
import RequireLogin from '@/components/RequireLogin'

const Gdrive: React.FC = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [loginHint, setLoginHint] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/gdrive')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          setLoading(false)
          setLoginHint(true)
          return
        }
        setFiles(data)
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div tw="shadow-lg rounded-xl p-4 bg-gray-900 relative overflow-hidden h-full w-full">
      <div tw="w-full flex items-center justify-between mb-4 p-4">
        <div tw="text-white text-xl font-normal flex align-middle justify-center text-center">
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
              strokeWidth={1}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <span tw="leading-9 ml-2">Recent Files</span>
        </div>
        <a
          href="https://drive.google.com/drive/u/0/recent"
          target="_blank"
          rel="noopener noreferer"
          tw="flex items-center text-sm text-gray-50 hover:text-white border-0 focus:outline-none"
        >
          VIEW ALL
        </a>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div tw="flex flex-col justify-between p-4">{files && files.map((file) => <GdriveFile file={file} key={file.id} />)}</div>
      )}
      {loginHint && (
        <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center">
          <p>Login to view latest files</p>
          <RequireLogin />
        </div>
      )}
    </div>
  )
}

export default Gdrive
