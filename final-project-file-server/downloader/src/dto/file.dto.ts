export class FileDTO {
  id: string
  name: string
  size: number
  numberDownloads: number
  totalSizeDownloads: number

  constructor (
    id: string,
    name: string,
    size: number,
    numberDownloads: number,
    totalSizeDownloads: number
  ) {
    this.id = id
    this.name = name
    this.size = size
    this.numberDownloads = numberDownloads
    this.totalSizeDownloads = totalSizeDownloads
  }
}
