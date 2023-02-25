import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { StoredFileService } from '../services/storedFile.service'
import { CloudStorageAccountService } from '../services/cloudStorageAccount.service'
import { DownloadRepository } from '../database/repositories/download.repository'
import { IDownloadRepository } from '../types/IDownloadRepository.type'
import { DownloadDTO } from '../dto/download.dto'

export class DonwloadFileService {
  private storedFileService: StoredFileService
  private cloudStorageAccountRepository: CloudStorageAccountService
  private downloadRepository: IDownloadRepository

  constructor () {
    this.storedFileService = new StoredFileService()
    this.cloudStorageAccountRepository = new CloudStorageAccountService()
    this.downloadRepository = new DownloadRepository()
  }

  donwloadFile = async (fileId: string) => {
    const selectedAccount: CloudStorageAccountDTO = await this.loadBalance()

    const storedFile = await this.storedFileService.readStoredFileByAccountAndFile(fileId, selectedAccount.id)

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

  loadBalance = async (): Promise<CloudStorageAccountDTO> => {
    const maxConcurrentDownloads = 3
    const cloudStorageAccounts = await this.cloudStorageAccountRepository.readCloudStorageAccounts()
    const selectedAccount: CloudStorageAccountDTO = cloudStorageAccounts.reduce((selectedAccount, account) => {
      const { numberDownloads: CurrentNumberDownloads, totalSizeDownloads: CurrentTotalSizeDownloads } = selectedAccount
      const { numberDownloads, totalSizeDownloads } = account
      const currentConcurrentDownloads = Math.floor(CurrentNumberDownloads / maxConcurrentDownloads)
      const concurrentDownloads = Math.floor(numberDownloads / maxConcurrentDownloads)

      if (currentConcurrentDownloads === concurrentDownloads) {
        return CurrentTotalSizeDownloads < totalSizeDownloads ? selectedAccount : account
      }

      return currentConcurrentDownloads < concurrentDownloads ? selectedAccount : account
    })
    return selectedAccount
  }

  readTodayDownloadsByStoredFileId = async (storedFileId: string) => {
    const downloads = await this.downloadRepository.readTodayDownloadsByStoredFileId(storedFileId)
    return downloads
  }

  readAllDownloadsByStoredFileId = async (storedFileId: string) => {
    const downloads = await this.downloadRepository.readAllDownloadsByStoredFileId(storedFileId)
    return downloads
  }

  readTodayDownloadsByStorageAccountId = async (storageAccountId: string) => {
    const downloads = await this.downloadRepository.readTodayDownloadsByStorageAccountId(storageAccountId)
    return downloads
  }

  readAllDownloadsByStorageAccountId = async (storageAccountId: string) => {
    const downloads = await this.downloadRepository.readAllDownloadsByStorageAccountId(storageAccountId)
    return downloads
  }

  updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO, storedFile: StoredFileDTO) => {
    const newCloudStorageAccount = { ...cloudStorageAccount }
    newCloudStorageAccount.numberDownloads += 1
    newCloudStorageAccount.totalSizeDownloads += 1
    return await this.cloudStorageAccountRepository.updateCloudStorageAccount(newCloudStorageAccount.id, newCloudStorageAccount)
  }
}
