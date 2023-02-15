import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'

export interface ICloudStorageAccountRepository {
  createCloudStorageAccount: (cloudStorageAccount: CloudStorageAccountDTO) => Promise<CloudStorageAccountDTO>
  readCloudStorageAccounts: () => Promise<CloudStorageAccountDTO[]>
  readCloudStorageAccount: (cloudStorageAccountId: string) => Promise<CloudStorageAccountDTO>
  updateCloudStorageAccount: (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO) => Promise<boolean>
  deleteCloudStorageAccount: (cloudStorageAccountId: string) => Promise<boolean>
}
