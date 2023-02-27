import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'

export interface ICloudStorageAccountRepository {
  createCloudStorageAccount: (cloudStorageAccountId: CloudStorageAccountDTO) => Promise<CloudStorageAccountDTO>
  readAllCloudStorageAccounts: () => Promise<CloudStorageAccountDTO[]>
  readCloudStorageAccountById: (cloudStorageAccountId: string) => Promise<CloudStorageAccountDTO>
  readCloudStorageAccount: (cloudStorageAccountId: string) => Promise<CloudStorageAccountDTO>
  updateCloudStorageAccount: (cloudStorageAccountId: string, storedFile: CloudStorageAccountDTO) => Promise<true>
  deleteCloudStorageAccount: (cloudStorageAccountId: string) => Promise<boolean>
}
