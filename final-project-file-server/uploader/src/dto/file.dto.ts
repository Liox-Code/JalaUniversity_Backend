export class FileDTO {
  fileId: string
  fileName: string
  mimeType: string
  size: number
  status: string
  content: Buffer

  constructor (
    fileId: string,
    fileName: string,
    mimeType: string,
    size: number,
    status: string,
    content: Buffer
  ) {
    this.fileId = fileId
    this.fileName = fileName
    this.mimeType = mimeType
    this.size = size
    this.status = status
    this.content = content
  }
}
