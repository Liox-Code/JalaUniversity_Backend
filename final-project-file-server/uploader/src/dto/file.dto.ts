export class FileDTO {
  fileId: string
  fileName: string
  size: string
  status: string

  constructor (
    fileId: string,
    fileName: string,
    size: string,
    status: string
  ) {
    this.fileId = fileId
    this.fileName = fileName
    this.size = size
    this.status = status
  }
}
