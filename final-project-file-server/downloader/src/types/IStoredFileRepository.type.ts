import { StoredFileDTO } from '../dto/storedFile.dto'

export interface IStoredFileRepository {
  createStoredFile: (storedFileId: StoredFileDTO) => Promise<StoredFileDTO>
  readAllStoredFiles: () => Promise<StoredFileDTO[]>
  readStoredFile: (storedFileId: string) => Promise<StoredFileDTO>
  readStoredFileByAccountAndFile: (fileId: string, driveId: string) => Promise<StoredFileDTO>
  readStoredFileByFileId: (fileId: string) => Promise<StoredFileDTO[]>
  updateStoredFile: (storedFileId: string, storedFile: StoredFileDTO) => Promise<true>
  deleteStoredFile: (storedFileId: string) => Promise<boolean>
}
