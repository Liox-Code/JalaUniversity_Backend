export class StoredFileDTO {
  id?: string
  fileId: string
  driveId: string
  cloudFileId: string
  webViewLink: string
  webContentLink: string

  constructor (
    fileId: string,
    driveId: string,
    cloudFileId: string,
    webViewLink: string,
    webContentLink: string
  ) {
    this.fileId = fileId
    this.driveId = driveId
    this.cloudFileId = cloudFileId
    this.webViewLink = webViewLink
    this.webContentLink = webContentLink
  }
}
