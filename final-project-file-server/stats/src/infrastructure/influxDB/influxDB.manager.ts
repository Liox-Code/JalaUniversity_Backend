import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { FileDTO } from '../../dto/file.dto'
import { CloudStorageAccountType, FileType } from '../../types/response.type'

export class InfluxDBManager {
  influxClient: InfluxDB

  constructor () {
    this.influxClient = new InfluxDB({
      url: 'http://localhost:8086',
      token: 'changeme'
    })
  }

  fileSize = async (cloudStorageAccount: CloudStorageAccountType, file: FileType) => {
    try {
      const writeApi = this.influxClient.getWriteApi('changeme', 'changeme')
      writeApi.useDefaultTags({ host: 'influxdb' })

      const pointFile = new Point('fileStats')
        .tag('location', 'fileStats')
        .floatField('numberDownloads', file.numberDownloads)
        .floatField('totalSizeDownloads', file.totalSizeDownloads)
        .timestamp(new Date())

      writeApi.writePoint(pointFile)

      const pointAccount = new Point('accountStats')
        .tag('location', 'accountStats')
        .floatField('numberDownloads', cloudStorageAccount.numberDownloads)
        .floatField('totalSizeDownloads', cloudStorageAccount.totalSizeDownloads)
        .timestamp(new Date())

      writeApi.writePoint(pointAccount)
      writeApi.close()
    } catch (error) {
      console.log(error)
    }
  }
}

export default InfluxDBManager
