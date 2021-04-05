import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import CrmProject from '@/components/CrmProject'
import Loader from '@/components/Loader'
import RequireLogin from '@/components/RequireLogin'

const CrmProjects: React.FC = (): React.ReactElement => {
  const [session] = useSession()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [loginHint, setLoginHint] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.crm.newtelco.de/dashboard/list?user=${session.user.name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          setLoading(false)
          setLoginHint(true)
          return
        }
        setProjects(data.results)
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div tw="shadow-lg rounded-xl p-4 bg-gray-800 relative overflow-hidden h-full w-full">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span tw="leading-9 ml-2">Open Projects</span>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div tw="flex flex-col justify-between p-4">
          {projects.length > 0 ? (
            projects.map((project) => <CrmProject key={project.id} project={project} />)
          ) : (
            <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center font-thin">
              <p>No open projects</p>
            </div>
          )}
        </div>
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

export default CrmProjects
