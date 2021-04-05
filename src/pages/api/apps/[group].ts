import Apps from './apps.json'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  !session && res.status(401).end('not authenticated')

  const categoryApps = Apps.filter((category) => category.category.toLowerCase() === req.query.group)

  res.send(categoryApps)
}
