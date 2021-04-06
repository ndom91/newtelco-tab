import React from 'react'
import { signIn, useSession } from 'next-auth/client'

const RequireLogin: React.FC = () => {
  const [session] = useSession()

  return (
    <div tw="mx-auto">
      {!session && (
        <div className="flex flex-row-reverse flex-wrap m-auto">
          <button
            tw="text-sm py-2.5 px-5 rounded-md border border-newtelco-600 flex items-center hocus:(outline-none ring-4 ring-newtelco-500 ring-opacity-20) transition-shadow duration-300 ease-in-out"
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
