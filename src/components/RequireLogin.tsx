import React from 'react'
import { signIn, useSession } from 'next-auth/client'

const RequireLogin: React.FC = () => {
  const [session] = useSession()
  return (
    <main>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </main>
  )
}

export default RequireLogin
