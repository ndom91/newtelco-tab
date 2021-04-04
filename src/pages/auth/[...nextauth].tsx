import RequireLogin from '@/components/RequireLogin'
import { signIn, useSession } from 'next-auth/client'
import { useEffect } from 'react'

const HomePage = () => {
  const [session] = useSession()

  useEffect(() => {
    // @ts-ignore
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

  return <RequireLogin />
}
export default HomePage
