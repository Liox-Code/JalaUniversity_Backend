import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { StoredFileService } from '../services/storedFile.service'
import { CloudStorageAccountService } from '../services/cloudStorageAccount.service'
import { DownloadRepository } from '../database/repositories/download.repository'
import { IDownloadRepository } from '../types/IDownloadRepository.type'
import { DownloadDTO } from '../dto/download.dto'

export class DonwloadFileService {
  private storedFileRepository: StoredFileService
  private cloudStorageAccountRepository: CloudStorageAccountService
  private downloadRepository: IDownloadRepository

  constructor () {
    this.storedFileRepository = new StoredFileService()
    this.cloudStorageAccountRepository = new CloudStorageAccountService()
    this.downloadRepository = new DownloadRepository()
  }

  donwloadFile = async (fileId: string) => {
    const cloudStorageAccounts = await this.cloudStorageAccountRepository.readCloudStorageAccounts()
    const selectedAccount: CloudStorageAccountDTO = cloudStorageAccounts.reduce((selectedAccount, account) => {
      const { totalSizeDownloads: currentTotalSizeDonwloads } = selectedAccount
      const { totalSizeDownloads } = account
      return currentTotalSizeDonwloads < totalSizeDownloads ? selectedAccount : account
    })

    const storedFile = await this.storedFileRepository.readStoredFileByAccountAndFile(fileId, selectedAccount.id)

    if (storedFile && storedFile.id) {
      const download: DownloadDTO = {
        storedFileId: storedFile.id
      }
      await this.downloadRepository.createDownload(download)
    }

    await this.updateCloudStorageAccount(selectedAccount, storedFile)

    console.log(`storedFile: ${storedFile}`)

    return storedFile
  }

  readTodayDownloadsByStoredFileId = async (storedFileId: string) => {
    const downloads = await this.downloadRepository.readTodayDownloadsByStoredFileId(storedFileId)
    return downloads
  }

  readAllDownloadsByStoredFileId = async (storedFileId: string) => {
    const downloads = await this.downloadRepository.readAllDownloadsByStoredFileId(storedFileId)
    return downloads
  }

  updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO, storedFile: StoredFileDTO) => {
    const newCloudStorageAccount = { ...cloudStorageAccount }
    newCloudStorageAccount.numberDownloads += 1
    newCloudStorageAccount.totalSizeDownloads += 1
    return await this.cloudStorageAccountRepository.updateCloudStorageAccount(newCloudStorageAccount.id, newCloudStorageAccount)
  }
}
