import React from 'react'
import { useSession } from 'next-auth/client'

const Welcome: React.FC = (): React.ReactElement => {
  const [session] = useSession()

  return (
    <div tw="px-6 py-4 lg:px-20 lg:py-10 flex text-4xl font-thin">
      <h1>Welcome &nbsp; </h1>
      {session && <p>{session?.user.name ?? ''}</p>}
    </div>
  )
}

export default Welcome
