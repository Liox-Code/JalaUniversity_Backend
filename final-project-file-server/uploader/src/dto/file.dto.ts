export class FileDTO {
  fileName: string
  mimeType: string
  size: number
  status: string
  content: Buffer

  constructor (
    fileName: string,
    mimeType: string,
    size: number,
    status: string,
    content: Buffer
  ) {
    this.fileName = fileName
    this.mimeType = mimeType
    this.size = size
    this.status = status
    this.content = content
  }
}
