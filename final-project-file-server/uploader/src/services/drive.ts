import { drive_v3, google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { Readable } from 'stream'

export class GoogleAPIService {
  private oauth2Client: OAuth2Client
  private drive: drive_v3.Drive

  constructor () {
    this.oauth2Client = new google.auth.OAuth2(
      '769487861968-si2om2r5fj90m3rvec5grrkqv4iuemoj.apps.googleusercontent.com',
      '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',
      'https://developers.google.com/oauthplayground/'
    )
    this.drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client
    })
    this.oauth2Client.setCredentials({
      refresh_token: '1//04sYJsgXPidMlCgYIARAAGAQSNwF-L9Irg4TOgP9gilAPvpWZLnsVWrdLRBW8TWh0hwC9KFyJKgNjwSib_nTewgVkX9VKsPRwAS0'
    })
  }

  public async uploadFile (file: Express.Multer.File) {
    const { originalname, mimetype, buffer } = file
    try {
      const requestBody = { name: originalname }
      const media = { mimeType: mimetype, body: Readable.from(buffer) }

      const file = await this.drive.files.create({ requestBody, media })

      const fileId = file.data.id as string
      await this.drive.permissions.create({
        fileId,
        requestBody: { role: 'reader', type: 'anyone' }
      })

      const response = await this.drive.files.get({
        fileId,
        fields: 'id, name, size, mimeType, webViewLink, webContentLink'
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  public async readFile (fileId: string) {
    try {
      const response = await this.drive.files.get({
        fileId,
        fields: 'id, name, size, mimeType, webViewLink, webContentLink'
      })

      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public async readFiles (pageSize: number, pageToken?: string) {
    try {
      const response = await this.drive.files.list({
        q: 'trashed = false',
        pageSize,
        pageToken,
        fields: 'nextPageToken, files(id, name, mimeType, createdTime, modifiedTime)'
      })

      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public async deleteFile (fileId: string) {
    try {
      await this.drive.files.delete({ fileId })
    } catch (error) {
      console.error(error)
    }
  }
}
