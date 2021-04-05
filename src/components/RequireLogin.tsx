import React from 'react'
import { signIn, useSession } from 'next-auth/client'

const RequireLogin: React.FC = () => {
  const [session] = useSession()
  return (
    <div>
      {!session && (
        <div className="flex flex-row-reverse flex-wrap m-auto">
          <button
            tw="text-sm py-2.5 px-5 rounded-md border border-newtelco-600 flex items-center hocus:(outline-none ring-4 ring-newtelco-500) hocus:ring-opacity-20 transition-shadow duration-300 ease-in-out"
            onClick={() => signIn()}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="24"
              width="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg> */}
            Login
          </button>
        </div>
      )}
    </div>
  )
}

export default RequireLogin
