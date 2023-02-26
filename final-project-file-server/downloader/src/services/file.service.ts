import { IFileRepository } from '../types/IFileRepository.type'
import { FileRepository } from '../database/repositories/file.repository'
import { FileDTO } from '../dto/file.dto'
import { DownloadRepository } from '../database/repositories/download.repository'
import { StoredFileService } from '../services/storedFile.service'
import { DownloadDTO } from '../dto/download.dto'
import { HttpError } from '../middlewares/errorHandler'

export class FileService {
  private fileRepository: IFileRepository
  private storedFileService: StoredFileService
  private donwloadFileRepository: DownloadRepository

  constructor () {
    this.fileRepository = new FileRepository()
    this.storedFileService = new StoredFileService()
    this.donwloadFileRepository = new DownloadRepository()
  }

  createFile = async (file: FileDTO) => {
    return await this.fileRepository.createFile(file)
  }

  readFiles = async () => {
    return await this.fileRepository.readFiles()
  }

  readFileById = async (fileId: string) => {
    const file = await this.fileRepository.readFileById(fileId)
    return file
  }

  readAllFileStats = async () => {
    const files = await this.fileRepository.readFiles()

    const filesStatsPromise = files.map(async (file) => {
      const fileStats = await this.getFileStats(file)
      return fileStats
    })

    const filesStats = Promise.all(filesStatsPromise).then((res) => { return res })
    return filesStats
  }

  readFileStats = async (fileId: string) => {
    const file = await this.fileRepository.readFileById(fileId)

    const fileStats = await this.getFileStats(file)

    return fileStats
  }

  updateFile = async (fileId: string, file: FileDTO) => {
    return await this.fileRepository.updateFile(fileId, file)
  }

  deleteFile = async (fileId: string) => {
    return await this.fileRepository.deleteFile(fileId)
  }

  getFileStats = async (file: FileDTO) => {
    if (!file.id) throw new HttpError(400, 'file does not have id')

    const storedFileList = await this.storedFileService.readStoredFileByFileId(file.id)

    const allTodayDownloads: DownloadDTO[] = []

    for (const storedFile of storedFileList) {
      if (storedFile.id) {
        const foundTodayDownloads = await this.donwloadFileRepository.readTodayDownloadsByStoredFileId(storedFile.id)
        allTodayDownloads.push(...foundTodayDownloads)
      }
    }

    const numberTodayDonwloads = allTodayDownloads.length
    const mbDonwloadedToday = file.size * allTodayDownloads.length

    return {
      ...file,
      NumberTodayDonwloads: numberTodayDonwloads,
      MBDonwloadedToday: mbDonwloadedToday
    }
  }
}
