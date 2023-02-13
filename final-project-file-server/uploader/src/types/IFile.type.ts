import { GridFSBucketReadStream } from 'typeorm'
import { FileDTO } from '../dto/file.dto'

export interface IFileRepository {
  createFile: (file: FileDTO) => Promise<FileDTO>
  readFile: (fileId: string) => Promise<FileDTO>
  updateFile: (file: FileDTO) => Promise<boolean>
  deleteFile: (fileId: string) => Promise<boolean>
  saveFile: (fileId: string, status: string, file: Express.Multer.File) => Promise<FileDTO>
  getFile: (fileId: string) => Promise<GridFSBucketReadStream>
}
