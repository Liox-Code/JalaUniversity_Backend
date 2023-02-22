import { FileDTO } from '../dto/file.dto'

export interface IFileRepository {
  createFile: (file: FileDTO) => Promise<FileDTO>
  readFiles: () => Promise<FileDTO[]>
  readFileById: (fileId: string) => Promise<FileDTO>
  updateFile: (fileId: string, file: FileDTO) => Promise<true>
  deleteFile: (fileId: string) => Promise<boolean>
}
