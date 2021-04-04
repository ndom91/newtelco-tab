import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import { useSession, signOut } from 'next-auth/client'

const RequireLogin = dynamic(() => import('src/components/RequireLogin'))

const IndexPage: React.FC = (): React.ReactElement => {
  const [session, loading] = useSession()

  if (typeof window !== 'undefined' && loading) return <p>Loading...</p>
  if (!session) return <RequireLogin />

  return (
    <Layout>
      <div className="card">
        <h1>{session.user.name}</h1>
        <div className="visual"></div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      <main></main>
    </Layout>
  )
}

export default IndexPage
