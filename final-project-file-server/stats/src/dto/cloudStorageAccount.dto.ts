export class CloudStorageAccountDTO {
  id: string
  email: string
  numberDownloads: number
  totalSizeDownloads: number

  constructor (
    id: string,
    email: string,
    numberDownloads: number,
    totalSizeDownloads: number
  ) {
    this.id = id
    this.email = email
    this.numberDownloads = numberDownloads
    this.totalSizeDownloads = totalSizeDownloads
  }
}
