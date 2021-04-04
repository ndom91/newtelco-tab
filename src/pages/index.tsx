import Layout from '@/components/Layout'
import Welcome from '@/components/Welcome'
import Gdrive from '@/components/Gdrive'

const IndexPage: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <div tw="grid gap-2 grid-cols-4">
        <Welcome />
        <Gdrive />
      </div>
    </Layout>
  )
}

export default IndexPage
