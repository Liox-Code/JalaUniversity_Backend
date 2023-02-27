export class StoredFileDTO {
  id?: string
  fileId: string
  driveId: string
  webViewLink: string
  webContentLink: string

  constructor (
    fileId: string,
    driveId: string,
    webViewLink: string,
    webContentLink: string
  ) {
    this.fileId = fileId
    this.driveId = driveId
    this.webViewLink = webViewLink
    this.webContentLink = webContentLink
  }
}
