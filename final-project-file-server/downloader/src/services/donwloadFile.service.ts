import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { StoredFileService } from '../services/storedFile.service'
import { CloudStorageAccountService } from '../services/cloudStorageAccount.service'
import { FileService } from '../services/file.service'
import { DownloadRepository } from '../database/repositories/download.repository'
import { IDownloadRepository } from '../types/IDownloadRepository.type'
import { DownloadDTO } from '../dto/download.dto'
import { MessageBrokerService } from '../services/messageBroker.service'
import { StoredFileDTO } from '../dto/storedFile.dto'
import { HttpError } from '../middlewares/errorHandler'
import { InfluxDBManager } from '../infrastructure/influxDB/influxDB.manager'

export class DonwloadFileService {
  private storedFileService: StoredFileService
  private cloudStorageAccountService: CloudStorageAccountService
  private fileService: FileService
  private downloadRepository: IDownloadRepository
  private messageBrokerService: MessageBrokerService
  influxDBManager: InfluxDBManager

  constructor () {
    this.storedFileService = new StoredFileService()
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.fileService = new FileService()
    this.downloadRepository = new DownloadRepository()
    this.messageBrokerService = new MessageBrokerService()
    this.influxDBManager = new InfluxDBManager()
  }

  donwloadFile = async (fileId: string) => {
    const selectedAccount: CloudStorageAccountDTO = await this.loadBalance()
    const donwloadedFile = await this.fileService.readFileById(fileId)

    if (!selectedAccount.id) throw new HttpError(400, `There was not found the account with id ${selectedAccount.id}`)
    if (!donwloadedFile.id) throw new HttpError(400, `There was not found the file with id ${donwloadedFile.id}`)

    const storedFile = await this.storedFileService.readStoredFileByAccountAndFile(donwloadedFile.id, selectedAccount.id)

    if (storedFile && storedFile.id) {
      const download: DownloadDTO = {
        storedFileId: storedFile.id
      }
      await this.downloadRepository.createDownload(download)

      await this.influxDBManager.fileSize(donwloadedFile)
    }
    const messageAllFilesUploaded = {
      action: 'calculateDonwloads',
      data: {
        account: selectedAccount,
        file: donwloadedFile
      }
    }
    await this.messageBrokerService.publishMessage(messageAllFilesUploaded)

    return storedFile
  }

  loadBalance = async (): Promise<CloudStorageAccountDTO> => {
    const maxConcurrentDownloads = 3
    const cloudStorageAccounts = await this.cloudStorageAccountService.readCloudStorageAccounts()
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

  updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    return await this.cloudStorageAccountService.updateCloudStorageAccount(cloudStorageAccount.id, cloudStorageAccount)
  }
}
