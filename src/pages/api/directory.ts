import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import { google } from 'googleapis'
const people = google.people('v1')

const dirReq = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiHandler> => {
  const session = await getSession({ req })

  if (!session) {
    res
      .status(401)
      .end(JSON.stringify({ domain: 'directory', error: 'not authenticated' }))
    return
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
  )
  oauth2Client.setCredentials({
    // @ts-ignore
    refresh_token: session.refreshToken,
    // @ts-ignore
    access_token: session.accessToken,
  })

  google.options({
    auth: oauth2Client,
  })

  const peopleResponse = await people.people.listDirectoryPeople({
    readMask:
      'organizations,names,emailAddresses,photos,birthdays,phoneNumbers',
    sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'],
  })

  const returnPeople = peopleResponse.data.people
    .reduce((acc, person) => {
      if (person?.phoneNumbers) {
        acc.push({
          id: person.resourceName,
          name: person.names?.[0].displayName ?? ' ',
          phones:
            person.phoneNumbers?.map((phone) => phone.canonicalForm) ?? [],
          email: person.emailAddresses?.[0].value ?? '',
          position: person.organizations?.[0].title ?? '',
          department: person.organizations?.[0].department ?? '',
          img: person.photos?.[0].url ?? '',
        })
      }
      return acc
    }, [])
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1
      }
      return -1
    })

  res.setHeader('Cache-Control', 'private, max-age=600')
  res.status(200).json(returnPeople)
}

export default dirReq
