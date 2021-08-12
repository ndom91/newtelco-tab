import React from 'react'
import { useSession } from 'next-auth/react'

const Welcome: React.FC = (): React.ReactElement => {
  const { data: session } = useSession()

  return (
    <div tw="flex px-6 py-4 text-4xl font-thin lg:px-10 lg:py-10">
      <h1>Welcome&nbsp;</h1>
      {session && <p>{session?.user.name ?? ''}</p>}
    </div>
  )
}

export default Welcome
