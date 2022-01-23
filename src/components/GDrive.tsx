import React, { useEffect, useState } from 'react'
import { Loader, GDriveFile, RequireLogin } from '@/components/index'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

const item = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

const GDrive: React.FC = () => {
  const { data: session } = useSession()
  const [files, setFiles] = useState({
    data: [],
    loading: false,
    loginRequired: false,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        setFiles({ ...files, loading: false, loginRequired: true })
        return true
      }

      setFiles({ ...files, loading: true, loginRequired: false })
      try {
        const response = await fetch('/api/gdrive')

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }

        setFiles({
          ...files,
          data: await response.json(),
          loading: false,
          loginRequired: false,
        })
      } catch (e) {
        setFiles({
          ...files,
          loading: false,
          loginRequired: true,
          error: e.message,
        })
      }
    }

    void fetchData()
  }, [session])

  return (
    <motion.div tw="p-4 bg-gray-900 rounded-xl shadow-lg" variants={item}>
      <div tw="flex items-center justify-between mb-4 p-4 w-full">
        <div tw="flex justify-center align-middle text-center text-white text-xl font-normal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
          <span tw="ml-2 leading-9">Recent Files</span>
        </div>
        <a
          href="https://drive.google.com/drive/u/0/recent"
          target="_blank"
          rel="noopener noreferer"
          tw="hover:(ring-4 ring-opacity-20) flex items-center p-2 text-gray-50 text-sm border-0 rounded-lg focus:outline-none transition duration-500 ring-newtelco-500"
        >
          VIEW ALL
        </a>
      </div>
      {!files.loginRequired ? (
        files.loading ? (
          <Loader />
        ) : (
          <div
            tw="flex flex-col justify-between p-4 overflow-y-scroll"
            css="height: calc(100vh - 380px);max-height:550px;"
          >
            {files.data &&
              files.data.map((file) => (
                <GDriveFile file={file} key={file.id} />
              ))}
          </div>
        )
      ) : (
        <div tw="flex flex-col justify-center align-middle h-48 text-center font-thin space-y-4">
          <p>Login to view latest files</p>
          <RequireLogin />
        </div>
      )}
    </motion.div>
  )
}

export default GDrive
