import React from 'react'
import { useSession, signOut } from 'next-auth/client'

const Welcome: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <div tw="p-4">
      {session && (
        <>
          <h1>Welcome</h1>
          <p>
            {session.user.name} ({session.user.email})
          </p>
          <button onClick={() => signOut()} tw="px-4 py-2 rounded-md bg-newtelco-500">
            Sign Out
          </button>
        </>
      )}
    </div>
  )
}

export default Welcome
