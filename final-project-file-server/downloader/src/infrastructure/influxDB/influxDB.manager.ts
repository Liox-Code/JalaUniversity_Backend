import { StoredFileDTO } from '../../dto/storedFile.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoredFileService } from '../../services/storedFile.service'
import { FileService } from '../../services/file.service'
import { FileDTO } from '../../dto/file.dto'
import { FileUploder, StoreFileUploder, CloudStorageAccountUploder } from '../../types/uploader/uploader.type'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { DonwloadFileService } from '../../services/donwloadFile.service'
import { CloudStorageAccountService } from '../../services/cloudStorageAccount.service'
import { HttpError } from '../../middlewares/errorHandler'
import { InfluxDB, Point } from '@influxdata/influxdb-client'

export class InfluxDBManager {
  influxClient: InfluxDB

  constructor () {
    this.influxClient = new InfluxDB({
      url: 'http://localhost:8086',
      token: 'mytoken'
    })
  }

  testInflux = async () => {
    try {
      const writeApi = this.influxClient.getWriteApi('my-org', 'my-bucket')
      writeApi.useDefaultTags({ host: 'server1' })

      const point = new Point('temperature')
        .tag('location', 'room1')
        .floatField('value', 22.5)
        .timestamp(new Date())

      writeApi.writePoint(point)
      writeApi.close()
    } catch (error) {
      console.log(error)
    }
    return message
  }
}

export default InfluxDBManager
