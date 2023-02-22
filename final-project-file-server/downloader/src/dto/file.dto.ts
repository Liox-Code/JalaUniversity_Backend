export class FileDTO {
  id?: string
  fileId: string
  name: string
  size: number
  numberDownloads: number
  totalSizeDownloads: number

  constructor (
    id: string,
    fileId: string,
    name: string,
    size: number,
    numberDownloads: number,
    totalSizeDownloads: number
  ) {
    this.id = id
    this.fileId = fileId
    this.name = name
    this.size = size
    this.numberDownloads = numberDownloads
    this.totalSizeDownloads = totalSizeDownloads
  }
}
