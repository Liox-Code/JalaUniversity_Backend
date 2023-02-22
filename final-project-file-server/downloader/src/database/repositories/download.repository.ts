import { AppDataSource } from '../dataSource'
import { Between, Repository } from 'typeorm'
import { IDownloadRepository } from '../../types/IDownloadRepository.type'
import { DownloadMapper } from '../../mappers/download.mapper'
import { DownloadDTO } from '../../dto/download.dto'
import { DownloadEntity } from '../entities/download.entity'
import { HttpError } from '../../middlewares/errorHandler'

export class DownloadRepository implements IDownloadRepository {
  private readonly repository: Repository<DownloadEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(DownloadEntity)
  }

  createDownload = async (download: DownloadDTO): Promise<DownloadDTO> => {
    const createdDownload = await this.repository.save(DownloadMapper.toEntity(download))
    return DownloadMapper.toDTO(createdDownload)
  }

  readDownloads = async (): Promise<DownloadDTO[]> => {
    const downloadFile = await this.repository.find()

    if (!downloadFile) throw new HttpError(400, 'Any file found')

    const downloadDTOs = downloadFile.map((download) => {
      return DownloadMapper.toDTO(download)
    })

    return downloadDTOs
  }

  readTodayDownloadsByStoredFileId = async (storedFileId: string) => {
    if (!storedFileId) throw new HttpError(400, 'storedFileId not provided')

    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)

    const foundStoredFile = await this.repository.findBy({
      storedFileId,
      createdAt: Between(startDate, endDate)
    })

    if (!foundStoredFile) throw new HttpError(400, `foundStoredFile with storedFileId ${storedFileId} not found`)

    const foundStoredFileDTO = foundStoredFile.map((storedFile) => {
      return DownloadMapper.toDTO(storedFile)
    })

    return foundStoredFileDTO
  }

  readAllDownloadsByStoredFileId = async (storedFileId: string) => {
    if (!storedFileId) throw new HttpError(400, 'storedFileId not provided')

    const foundStoredFile = await this.repository.findBy({
      storedFileId
    })

    if (!foundStoredFile) throw new HttpError(400, `foundStoredFile with storedFileId ${storedFileId} not found`)

    const foundStoredFileDTO = foundStoredFile.map((storedFile) => {
      return DownloadMapper.toDTO(storedFile)
    })

    return foundStoredFileDTO
  }

  readDownloadById = async (downloadId: string): Promise<DownloadDTO> => {
    if (!downloadId) throw new HttpError(400, 'downloadId not provided')

    const foundDownload = await this.repository.findOneBy({ id: downloadId })

    if (!foundDownload) throw new HttpError(400, `download with id ${downloadId} not found`)

    return DownloadMapper.toDTO(foundDownload)
  }
}
