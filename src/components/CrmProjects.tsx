import React, { useEffect, useState } from 'react'
import { Loader, CrmProject, RequireLogin } from '@/components/index'
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

const CrmProjects: React.FC = (): React.ReactElement => {
  const { data: session } = useSession()
  const [projects, setProjects] = useState({
    data: [],
    loading: false,
    loginRequired: false,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        setProjects({ ...projects, loading: false, loginRequired: true })
        return true
      }

      setProjects({ ...projects, loading: true, loginRequired: false })
      try {
        const response = await fetch(
          `https://api.crm.newtelco.de/dashboard/list?user=${session.user.name}`,
        )

        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`)
        }

        const data = await response.json()

        setProjects({
          ...projects,
          data: data.results,
          loading: false,
          loginRequired: false,
        })
      } catch (e) {
        setProjects({
          ...projects,
          loading: false,
          loginRequired: true,
          error: e.message,
        })
      }
    }

    void fetchData()
  }, [session]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      tw="relative p-4 w-full bg-gray-900 rounded-xl shadow-lg overflow-hidden"
      variants={item}
    >
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span tw="ml-2 leading-9">Open Projects</span>
        </div>
      </div>
      {projects.loading ? (
        <Loader />
      ) : (
        <div tw="flex flex-col justify-start m-4 p-4 overflow-y-scroll space-y-4">
          {projects.data.length > 0 ? (
            projects.data.map((project) => (
              <CrmProject key={project.id} project={project} />
            ))
          ) : (
            <div tw="flex flex-col justify-center align-middle h-48 text-center font-thin space-y-4">
              {projects.loginRequired ? (
                <>
                  <p>Login to view open projects</p>
                  <RequireLogin />
                </>
              ) : (
                <p>No open projects</p>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default CrmProjects
