import { StoredFileRepository } from '../database/repositories/storedFile.repository'
import { StoredFileDTO } from '../dto/storedFile.dto'
import { IStoredFileRepository } from '../types/IStoredFileRepository.type'

export class StoredFileService {
  private storedFileRepository: IStoredFileRepository

  constructor () {
    this.storedFileRepository = new StoredFileRepository()
  }

  createStoredFile = async (storedFile: StoredFileDTO) => {
    return await this.storedFileRepository.createStoredFile(storedFile)
  }

  readAllStoredFiles = async () => {
    return await this.storedFileRepository.readAllStoredFiles()
  }

  readStoredFile = async (storedFileId: string) => {
    return await this.storedFileRepository.readStoredFile(storedFileId)
  }

  readStoredFileByAccountAndFile = async (fileId: string, driveId: string) => {
    return await this.storedFileRepository.readStoredFileByAccountAndFile(fileId, driveId)
  }

  readStoredFileByFileId = async (fileId: string) => {
    return await this.storedFileRepository.readStoredFileByFileId(fileId)
  }

  readStoredFileByStorageAccountId = async (storageAccountId: string) => {
    return await this.storedFileRepository.readStoredFileByStorageAccountId(storageAccountId)
  }

  updateStoredFile = async (storedFileId: string, storedFile: StoredFileDTO) => {
    return await this.storedFileRepository.updateStoredFile(storedFileId, storedFile)
  }

  deleteStoredFile = async (storedFileId: string) => {
    return await this.storedFileRepository.deleteStoredFile(storedFileId)
  }

  deleteStoredFileByCloudStorageAccount = async (storedFileId: string) => {
    return await this.storedFileRepository.deleteStoredFileByCloudStorageAccount(storedFileId)
  }

  deleteStoreFileByFile = async (fileId: string) => {
    await this.storedFileRepository.deleteStoreFileByFile(fileId)
  }
}
