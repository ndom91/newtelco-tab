import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'

const gdriveReq = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiHandler> => {
  const session = await getSession({ req })

  if (!session) {
    res
      .status(401)
      .end(JSON.stringify({ domain: 'gdrive', error: 'not authenticated' }))
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

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  })

  const driveRes = await drive.files.list({
    orderBy: 'viewedByMeTime desc',
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    q: 'trashed=false and mimeType!="application/vnd.google-apps.folder"',
    pageSize: 10,
    fields: 'files(name,kind,mimeType,id,modifiedTime)',
  })

  res.setHeader('Cache-Control', 'private, max-age=600')
  res.json(driveRes.data.files)
}

export default gdriveReq
