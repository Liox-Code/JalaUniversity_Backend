import { FindManyOptions, Repository } from 'typeorm'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { CloudStorageAccountMapper } from '../../mappers/cloudStorageAccount.mapper'
import { ICloudStorageAccountRepository } from '../../types/ICloudStorageAccountRepository.type'
import { CloudStorageAccountEntity } from '../entities/cloudStorageAccount.entity'
import { AppDataSource } from '../dataSource'

export class CloudStorageAccountRepository implements ICloudStorageAccountRepository {
  private readonly repository: Repository<CloudStorageAccountEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(CloudStorageAccountEntity)
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO): Promise<CloudStorageAccountDTO> => {
    const createdCloudStorageAccount = await this.repository.save(CloudStorageAccountMapper.toEntity(cloudStorageAccount))
    return CloudStorageAccountMapper.toDTO(createdCloudStorageAccount)
  }

  readAllCloudStorageAccounts = async (): Promise<CloudStorageAccountDTO[]> => {
    const foundCloudStorageAccount = await this.repository.find()

    if (!foundCloudStorageAccount) {
      throw new Error('Any CloudStorageAccount found')
    }

    const cloudStorageAccountDTOs = foundCloudStorageAccount.map((cloudStorageAccount) => {
      return CloudStorageAccountMapper.toDTO(cloudStorageAccount)
    })

    return cloudStorageAccountDTOs
  }

  readCloudStorageAccount = async (cloudStorageAccountId: string): Promise<CloudStorageAccountDTO> => {
    if (!cloudStorageAccountId) throw new Error('cloudStorageAccountId not provided')

    const foundCloudStorageAccount = await this.repository.findOneBy({ id: cloudStorageAccountId })

    if (!foundCloudStorageAccount) {
      throw new Error(`Cloud Storage Account with id ${cloudStorageAccountId} not found`)
    }

    return CloudStorageAccountMapper.toDTO(foundCloudStorageAccount)
  }

  updateCloudStorageAccount = async (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO): Promise<true> => {
    if (!cloudStorageAccountId) throw new Error('cloudStorageAccountId not provided')

    const updatedCloudStorageAccount = await this.repository.update({ id: cloudStorageAccountId }, CloudStorageAccountMapper.toEntity(cloudStorageAccount))

    const didAffect = (updatedCloudStorageAccount.affected && updatedCloudStorageAccount.affected > 0)

    if (!didAffect) {
      throw new Error(`CloudStorageAccount ${cloudStorageAccountId}, affected equal to 0`)
    }

    return didAffect
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    if (!cloudStorageAccountId) throw new Error('cloudStorageAccountId not provided')

    const options: FindManyOptions<CloudStorageAccountEntity> = {
      where: { id: cloudStorageAccountId }
    }
    const cloudStorage = await this.repository.find(options)
    const removeResponse = await this.repository.remove(cloudStorage)
    return (removeResponse.length > 0)
  }
}
