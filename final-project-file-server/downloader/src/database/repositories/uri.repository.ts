import { FindManyOptions, Repository } from 'typeorm'
import { UriDTO } from '../../dto/uri.dto'
import { UriMapper } from '../../mappers/uri.mapper'
import { IUriRepository } from '../../types/IUriRepository.type'
import { AppDataSource } from '../dataSource'
import { UriEntity } from '../entities/uri.entity'

export class UriRepository implements IUriRepository {
  private readonly repository: Repository<UriEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(UriEntity)
  }

  createUri = async (uriId: UriDTO) => {
    const createdUri = await this.repository.save(UriMapper.toEntity(uriId))
    return UriMapper.toDTO(createdUri)
  }

  readUri = async (uriId: string) => {
    const foundUri = await this.repository.findOneBy({ uriId })

    if (!foundUri) {
      throw new Error(`Uri with id ${uriId} not found`)
    }

    return UriMapper.toDTO(foundUri)
  }

  updateUri = async (uri: UriDTO) => {
    const { uriId } = uri
    const updatedUri = await this.repository.update({ uriId }, UriMapper.toEntity(uri))

    const didAffect = (updatedUri.affected && updatedUri.affected > 0)

    if (!didAffect) {
      throw new Error(`Uri ${uriId}, affected equal to 0`)
    }

    return didAffect
  }

  deleteUri = async (uriId: string) => {
    const options: FindManyOptions<UriEntity> = {
      where: { uriId }
    }
    const uri = await this.repository.find(options)
    const removeResponse = await this.repository.remove(uri)
    return (removeResponse.length > 0)
  }
}
