import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/client'
import GdriveFile from '@/components/GdriveFile'
import Loader from '@/components/Loader'
import RequireLogin from '@/components/RequireLogin'

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

const Gdrive: React.FC = () => {
  const [session] = useSession()
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

        setFiles({ ...files, data: await response.json(), loading: false, loginRequired: false })
      } catch (e) {
        setFiles({ ...files, loading: false, loginRequired: true, error: e.message })
      }
    }

    void fetchData()
  }, [session])

  return (
    <motion.div tw="shadow-lg rounded-xl p-4 bg-gray-900" variants={item}>
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
          tw="flex items-center text-sm text-gray-50 hover:(ring-4 ring-newtelco-500 ring-opacity-20) rounded-lg p-2 transition duration-500 border-0 focus:outline-none"
        >
          VIEW ALL
        </a>
      </div>
      {!files.loginRequired ? (
        files.loading ? (
          <Loader />
        ) : (
          <div tw="flex flex-col justify-between p-4 overflow-y-scroll" css="height: calc(100vh - 380px);max-height:550px;">
            {files.data && files.data.map((file) => <GdriveFile file={file} key={file.id} />)}
          </div>
        )
      ) : (
        <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
          <p>Login to view latest files</p>
          <RequireLogin />
        </div>
      )}
    </motion.div>
  )
}

export default Gdrive
