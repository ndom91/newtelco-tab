import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
const people = google.people('v1')
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).end(JSON.stringify({ domain: 'directory', error: 'not authenticated' }))
    return
  }

  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET)
  oauth2Client.setCredentials({
    // @ts-ignore
    refresh_token: session.refreshToken,
    access_token: session.accessToken,
  })

  google.options({
    auth: oauth2Client,
  })

  const peopleResponse = await people.people.listDirectoryPeople({
    readMask: 'organizations,names,emailAddresses,photos,birthdays,phoneNumbers',
    sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
  })

  res.setHeader('Cache-Control', 'private, max-age=600')
  res.json(peopleResponse.data)
}
