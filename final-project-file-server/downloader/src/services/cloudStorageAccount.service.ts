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

  readCloudStorageAccountById = async (cloudStorageAccountId: string) => {
    const cloudStorageAccount = await this.cloudStorageAccountRepository.readCloudStorageAccountById(cloudStorageAccountId)

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

    const numberDonwloads = allDownloads.length
    const numberTodayDonwloads = allTodayDownloads.length
    const mbDonwloadedToday = cloudStorageAccount.totalSizeDownloads * numberTodayDonwloads
    const mbDonwloadedTotal = cloudStorageAccount.totalSizeDownloads * numberDonwloads

    return {
      Email: cloudStorageAccount.email,
      NumberDonwloads: numberDonwloads,
      NumberTodayDonwloads: numberTodayDonwloads,
      MBDonwloadedToday: mbDonwloadedToday,
      MBDonwloadedTotal: mbDonwloadedTotal
    }
  }

  updateCloudStorageAccount = async (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO) => {
    return await this.cloudStorageAccountRepository.updateCloudStorageAccount(cloudStorageAccountId, cloudStorageAccount)
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccountRepository.deleteCloudStorageAccount(cloudStorageAccountId)
  }
}
