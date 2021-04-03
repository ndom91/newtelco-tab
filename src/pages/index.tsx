import Layout from '@/components/Layout'
import Header from '@/components/Header'
import dynamic from 'next/dynamic'
import { useSession, signOut } from 'next-auth/client'

const RequireLogin = dynamic(() => import('@/components/RequireLogin'))

const IndexPage: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return <p>Loading...</p>
  if (!session) return <RequireLogin />

  return (
    <Layout>
      <Header />
      <main>Signed in as {session.user.email}</main>
      <button onClick={() => signOut()}>Sign Out</button>
    </Layout>
  )
}

export default IndexPage
