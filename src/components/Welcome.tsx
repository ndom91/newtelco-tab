import React from 'react'
import RequireLogin from '@/components/RequireLogin'
import { useSession } from 'next-auth/client'

const Welcome: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession()

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  return (
    <div tw="p-4">
      {session ? (
        <>
          <h1>Welcome</h1>
          <p>
            {session.user.name} ({session.user.email})
          </p>
        </>
      ) : (
        <RequireLogin />
      )}
    </div>
  )
}

export default Welcome
