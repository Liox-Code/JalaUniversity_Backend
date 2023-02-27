import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { FileDTO } from '../dto/file.dto'
import { MessageBrokerService } from '../services/messageBroker.service'
import { InfluxDBManager } from '../infrastructure/influxDB/influxDB.manager'

export class StatService {
  messageBrokerService: MessageBrokerService
  influxDBManager: InfluxDBManager

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.influxDBManager = new InfluxDBManager()
  }

  async calculateStats (cloudStorageAccount: CloudStorageAccountDTO, file: FileDTO) {
    const newCloudStorageAccount = { ...cloudStorageAccount }
    newCloudStorageAccount.numberDownloads += 1
    newCloudStorageAccount.totalSizeDownloads += file.size

    const newFile = { ...file }
    newFile.numberDownloads += 1
    newFile.totalSizeDownloads += file.size

    await this.influxDBManager.fileSize(newCloudStorageAccount, newFile)

    const message = {
      action: 'statsCalculated',
      data: {
        account: newCloudStorageAccount,
        file: newFile
      }
    }
    await this.messageBrokerService.publishMessage(message)
  }
}
