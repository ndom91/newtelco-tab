import type { NextApiRequest, NextApiResponse } from 'next'
import Apps from './apps.json'

interface App {
  name: string
  url: string
  img: string
}

interface Data {
  category: string
  apps: App[]
}

const groupReq = (req: NextApiRequest, res: NextApiResponse<Data[]>) => {
  res.setHeader(
    'Cache-Control',
    's-maxage=315360, max-age=315360, stale-while-revalidate',
  )
  res.status(200).send(Apps)
}

export default groupReq
