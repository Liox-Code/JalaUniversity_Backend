import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { StoredFileService } from '../services/storedFile.service'
import { CloudStorageAccountService } from '../services/cloudStorageAccount.service'

export class DonwloadFileService {
  private storedFileRepository: StoredFileService
  private cloudStorageAccountRepository: CloudStorageAccountService

  constructor () {
    this.storedFileRepository = new StoredFileService()
    this.cloudStorageAccountRepository = new CloudStorageAccountService()
  }

  donwloadFile = async (fileId: string) => {
    const cloudStorageAccounts = await this.cloudStorageAccountRepository.readCloudStorageAccounts()
    const selectedAccount: CloudStorageAccountDTO = cloudStorageAccounts.reduce((selectedAccount, account) => {
      const { totalSizeDownloads: currentTotalSizeDonwloads } = selectedAccount
      const { totalSizeDownloads } = account
      return currentTotalSizeDonwloads < totalSizeDownloads ? selectedAccount : account
    })

    const storedFile = await this.storedFileRepository.readStoredFileByAccountAndFile(fileId, selectedAccount.id)

    await this.updateCloudStorageAccount(selectedAccount, storedFile)
    // console.log(`selectedAccount: ${JSON.stringify(selectedAccount)}`)
    console.log(`storedFile: ${storedFile}`)

    return storedFile
  }

  updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO, storedFile: StoredFileDTO) => {
    const newCloudStorageAccount = { ...cloudStorageAccount }
    newCloudStorageAccount.numberDownloads += 1
    newCloudStorageAccount.totalSizeDownloads += 1
    return await this.cloudStorageAccountRepository.updateCloudStorageAccount(newCloudStorageAccount.id, newCloudStorageAccount)
  }
}
