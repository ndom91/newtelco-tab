import React from 'react'
import { useSession } from 'next-auth/client'

const Welcome: React.FC = (): React.ReactElement => {
  const [session] = useSession()

  return (
    <div tw="p-8 flex text-4xl font-thin">
      <h1>Welcome &nbsp; </h1>
      {session && <p>{session?.user.name ?? ''}</p>}
    </div>
  )
}

export default Welcome
