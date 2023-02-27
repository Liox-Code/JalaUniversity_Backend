import { ICloudStorageAccountRepository } from '../types/ICloudStorageAccountRepository.type'
import { CloudStorageAccountRepository } from '../database/repositories/cloudStorageAccount.repository'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { StoredFileService } from './storedFile.service'
import { DownloadDTO } from '../dto/download.dto'
import { DownloadRepository } from '../database/repositories/download.repository'

export class CloudStorageAccountService {
  private cloudStorageAccountRepository: ICloudStorageAccountRepository
  private storedFileService: StoredFileService
  private downloadRepository: DownloadRepository

  constructor () {
    this.cloudStorageAccountRepository = new CloudStorageAccountRepository()
    this.storedFileService = new StoredFileService()
    this.downloadRepository = new DownloadRepository()
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    return this.cloudStorageAccountRepository.createCloudStorageAccount(cloudStorageAccount)
  }

  readCloudStorageAccounts = async () => {
    return await this.cloudStorageAccountRepository.readAllCloudStorageAccounts()
  }

  readAllCloudStorageAccountStats = async () => {
    const cloudStorageAccounts = await this.cloudStorageAccountRepository.readAllCloudStorageAccounts()

    const cloudStorageAccountsStatsPromise = cloudStorageAccounts.map(async (cloudStorageAccount) => {
      const cloudStorageAccountStats = await this.getCloudStorageAccountStats(cloudStorageAccount)
      return cloudStorageAccountStats
    })

    const cloudStorageAccountsStats = Promise.all(cloudStorageAccountsStatsPromise).then((res) => { return res })
    return cloudStorageAccountsStats
  }

  readCloudStorageAccountById = async (cloudStorageAccountId: string) => {
    const cloudStorageAccount = await this.cloudStorageAccountRepository.readCloudStorageAccountById(cloudStorageAccountId)

    const cloudStorageAccountStats = await this.getCloudStorageAccountStats(cloudStorageAccount)

    return cloudStorageAccountStats
  }

  updateCloudStorageAccount = async (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO) => {
    return await this.cloudStorageAccountRepository.updateCloudStorageAccount(cloudStorageAccountId, cloudStorageAccount)
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccountRepository.deleteCloudStorageAccount(cloudStorageAccountId)
  }

  getCloudStorageAccountStats = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const cloudStorageAccountsList = await this.storedFileService.readStoredFileByStorageAccountId(cloudStorageAccount.id)

    const allDownloads: DownloadDTO[] = []
    const allTodayDownloads: DownloadDTO[] = []

    for (const account of cloudStorageAccountsList) {
      if (account.id) {
        const foundTodayDownloads = await this.downloadRepository.readTodayDownloadsByStorageAccountId(account.id)
        allTodayDownloads.push(...foundTodayDownloads)

        const foundDownloads = await this.downloadRepository.readAllDownloadsByStorageAccountId(account.id)
        allDownloads.push(...foundDownloads)
      }
    }

    const numberTodayDonwloads = allTodayDownloads.length
    const mbDonwloadedToday = cloudStorageAccount.totalSizeDownloads * numberTodayDonwloads

    return {
      Id: cloudStorageAccount.id,
      Email: cloudStorageAccount.email,
      NumberDonwloads: cloudStorageAccount.numberDownloads,
      NumberTodayDonwloads: numberTodayDonwloads,
      MBDonwloadedToday: mbDonwloadedToday,
      MBDonwloadedTotal: cloudStorageAccount.totalSizeDownloads
    }
  }
}
