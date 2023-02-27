export class FileDTO {
  id?: string
  fileId: string
  fileName: string
  mimeType: string
  size: number
  status: string
  content: Buffer

  constructor (
    id: string,
    fileId: string,
    fileName: string,
    mimeType: string,
    size: number,
    status: string,
    content: Buffer
  ) {
    this.id = id
    this.fileId = fileId
    this.fileName = fileName
    this.mimeType = mimeType
    this.size = size
    this.status = status
    this.content = content
  }
}
