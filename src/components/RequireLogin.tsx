import React from 'react'
import { signIn, useSession } from 'next-auth/client'

const RequireLogin: React.FC = () => {
  const [session] = useSession()

  return (
    <div tw="mx-auto">
      {!session && (
        <div className="flex flex-row-reverse flex-wrap m-auto">
          <button
            tw="hocus:(outline-none ring-opacity-20) flex items-center px-5 py-2.5 text-sm border border-newtelco-600 rounded-md transition-shadow duration-300 ease-in-out ring-newtelco-500 ring-4"
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
