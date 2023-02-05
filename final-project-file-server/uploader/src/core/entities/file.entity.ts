export class FileEntity {
  constructor (
    private fileId: number,
    private fileName: string,
    private direction: string
  ) {
    console.log(fileId)
    console.log(fileName)
    console.log(direction)
  }
}
