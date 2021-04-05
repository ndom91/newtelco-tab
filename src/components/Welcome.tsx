import React from 'react'
import { useSession } from 'next-auth/client'

const Welcome: React.FC = (): React.ReactElement => {
  const [session] = useSession()

  return (
    <div tw="p-4">
      {session && (
        <>
          <h1>Welcome</h1>
          <p>
            {session?.user.name ?? ''} ({session?.user.email ?? ''})
          </p>
        </>
      )}
    </div>
  )
}

export default Welcome
