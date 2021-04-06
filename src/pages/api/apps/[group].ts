import type { NextApiRequest, NextApiResponse } from 'next'
import Apps from './apps.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const categoryApps = new Promise((resolve) => {
    resolve(Apps.filter((category) => category.category.toLowerCase() === req.query.group))
  })

  res.send(await categoryApps)
}
