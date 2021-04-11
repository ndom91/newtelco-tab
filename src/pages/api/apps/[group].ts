import type { NextApiRequest, NextApiResponse } from 'next'
import Apps from './apps.json'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const categoryApps = new Promise((resolve) => {
    resolve(
      Apps.filter(
        (category) => category.category.toLowerCase() === req.query.group,
      ),
    )
  })

  res.setHeader('Cache-Control', 'private, max-age=600')
  res.status(200).send(await categoryApps)
}
