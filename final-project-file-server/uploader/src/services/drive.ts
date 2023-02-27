import { drive_v3, google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { Readable } from 'stream'
import { TAPICredentials } from '../types/IStoredFile.type'
import { json } from 'express'

export class GoogleAPIService {
  private oauth2Client: OAuth2Client
  private drive: drive_v3.Drive

  constructor (credentials: TAPICredentials) {
    this.oauth2Client = new google.auth.OAuth2(
      credentials.credentialClientID,
      credentials.credentialSecret,
      credentials.credentialRedirecrUri
    )
    this.drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client
    })
    this.oauth2Client.setCredentials({
      refresh_token: credentials.credentialRefreshToken
    })
  }

  public async uploadFile (file: { originalname: string, mimetype: string, buffer: Buffer }) {
    const { originalname, mimetype, buffer } = file

    try {
      const requestBody = { name: originalname }
      const bufferData = Buffer.from(buffer.data)
      const media = { mimeType: mimetype, body: Readable.from(bufferData) }

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

  public async readFiles (pageSize?: number, pageToken?: string) {
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

  public async deleteFile (driveFileId: string) {
    try {
      await this.drive.files.delete({ fileId: driveFileId })
    } catch (error) {
      console.error(error)
    }
  }
}
