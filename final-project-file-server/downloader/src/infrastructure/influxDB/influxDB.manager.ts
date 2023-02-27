import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { FileDTO } from '../../dto/file.dto'

export class InfluxDBManager {
  influxClient: InfluxDB

  constructor () {
    this.influxClient = new InfluxDB({
      url: 'http://localhost:8086',
      token: 'changeme'
    })
  }

  fileSize = async (file: FileDTO) => {
    try {
      const writeApi = this.influxClient.getWriteApi('changeme', 'changeme')
      writeApi.useDefaultTags({ host: 'influxdb' })

      const point = new Point('fileSize')
        .tag('location', 'downloader')
        .floatField('value', file.size)
        .timestamp(new Date())

      writeApi.writePoint(point)
      writeApi.close()
    } catch (error) {
      console.log(error)
    }
  }
}

export default InfluxDBManager
