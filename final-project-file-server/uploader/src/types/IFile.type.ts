import { FileDTO } from '../dto/file.dto'

export interface IFileRepository {
  createFile: (file: Express.Multer.File) => Promise<FileDTO>
  readFiles: () => Promise<FileDTO[]>
  readFileById: (id: string) => Promise<FileDTO>
  updateFile: (fileDTO: FileDTO, file: Express.Multer.File) => Promise<FileDTO>
  updateFileStatus: (id: string, status: string) => Promise<true>
  deleteFile: (fileDTO: FileDTO) => Promise<FileDTO>
}
