import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import CrmProject from '@/components/CrmProject'
import Loader from '@/components/Loader'
import RequireLogin from '@/components/RequireLogin'

const Gdirectory: React.FC = () => {
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span tw="leading-9 ml-2">Contact Info</span>
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
              <p>No colleagues found</p>
            </div>
          )}
        </div>
      )}
      {loginHint && (
        <div tw="flex flex-col justify-center align-middle space-y-4 h-48 text-center">
          <p>Login to view colleauges information</p>
          <RequireLogin />
        </div>
      )}
    </div>
  )
}

export default Gdirectory
