export class StoreFileDTO {
  cloudStorageAccountId: string
  fileId: string
  cloudFileId: string
  webViewLink: string
  webContentLink: string

  constructor (
    cloudStorageAccountId: string,
    fileId: string,
    cloudFileId: string,
    webViewLink: string,
    webContentLink: string
  ) {
    this.cloudStorageAccountId = cloudStorageAccountId
    this.fileId = fileId
    this.cloudFileId = cloudFileId
    this.webViewLink = webViewLink
    this.webContentLink = webContentLink
  }
}
