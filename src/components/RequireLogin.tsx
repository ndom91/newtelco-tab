import React from 'react'
import { signIn, useSession } from 'next-auth/client'

const RequireLogin: React.FC = () => {
  const [session] = useSession()

  return (
    <div tw="mx-auto">
      {!session && (
        <div className="flex flex-row-reverse flex-wrap m-auto">
          <button
            tw="flex items-center px-5 py-2.5 text-sm border border-newtelco-600 rounded-md outline-none hocus:outline-none transition-shadow duration-300 ease-in-out hocus:ring-newtelco-500 hocus:ring-opacity-20 hocus:ring-4"
            onClick={() => signIn('google')}
          >
            Login
          </button>
        </div>
      )}
    </div>
  )
}

export default RequireLogin
