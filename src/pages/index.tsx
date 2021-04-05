import Layout from '@/components/Layout'
import Welcome from '@/components/Welcome'
import GoogleWorkspace from '@/components/GoogleWorkspace'

const IndexPage: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <div tw="w-full h-full grid gap-2 grid-cols-2 grid-rows-3" css="grid-template-rows: repeat( auto-fill, minmax(100px, 1fr) )">
        <Welcome />
        <GoogleWorkspace tw="row-start-2 row-span-2" />
      </div>
    </Layout>
  )
}

export default IndexPage
