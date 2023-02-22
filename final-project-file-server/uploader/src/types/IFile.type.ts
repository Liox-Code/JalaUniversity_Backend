import { FileDTO } from '../dto/file.dto'

export interface IFileRepository {
  createFile: (file: Express.Multer.File) => Promise<FileDTO>
  readFiles: () => Promise<FileDTO[]>
  readFileById: (fileId: string) => Promise<FileDTO>
  updateFile: (fileId: string, file: Express.Multer.File) => Promise<FileDTO>
  updateFileStatus: (fileId: string, status: string) => Promise<true>
  deleteFile: (fileId: string) => Promise<boolean>
}
