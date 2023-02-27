import { IFileRepository } from '../types/IFile.type'
import { FileRepository } from '../database/repositories/file.repository'
import { StoreFileService } from '../services/storeFile.service'
import { MessageBrokerService } from './messageBroker.service'

export class FileService {
  private file: IFileRepository
  private storeFileService: StoreFileService
  private messageBrokerService: MessageBrokerService

  constructor () {
    this.file = new FileRepository()
    this.messageBrokerService = new MessageBrokerService()
    this.storeFileService = new StoreFileService()
  }

  createFile = async (file: Express.Multer.File) => {
    return await this.file.createFile(file)
  }

  readFiles = async () => {
    return await this.file.readFiles()
  }

  readFileById = async (id: string) => {
    return await this.file.readFileById(id)
  }

  updateFile = async (id: string, file: Express.Multer.File) => {
    const fileDTO = await this.readFileById(id)
    const updatedFile = await this.file.updateFile(fileDTO, file)
    await this.storeFileService.updateCloudFile(updatedFile)

    const message = {
      action: 'updateFile',
      data: {
        file: updatedFile
      }
    }
    await this.messageBrokerService.publishMessage(message)

    return updatedFile
  }

  updateFileStatus = async (fileId: string, status: string) => {
    return await this.file.updateFileStatus(fileId, status)
  }

  deleteFile = async (id: string) => {
    const fileDTO = await this.readFileById(id)
    await this.storeFileService.deleteStoreFileByFile(id)

    const message = {
      action: 'deleteFile',
      data: {
        file: fileDTO
      }
    }
    await this.messageBrokerService.publishMessage(message)

    return await this.file.deleteFile(fileDTO)
  }
}
