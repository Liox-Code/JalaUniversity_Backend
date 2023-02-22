export class DownloadDTO {
  id?: string
  storedFileId: string
  createdAt?: Date

  constructor (
    id: string,
    storedFileId: string,
    createdAt: Date
  ) {
    this.id = id
    this.storedFileId = storedFileId
    this.createdAt = createdAt
  }
}
