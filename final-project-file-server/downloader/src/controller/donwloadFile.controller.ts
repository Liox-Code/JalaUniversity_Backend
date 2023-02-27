import { Router, Request, Response, NextFunction } from 'express'
import { DonwloadFileService } from '../services/donwloadFile.service'
// import { InfluxDBManager } from '../infrastructure/influxDB/influxDB.manager'
import { HttpError } from '../middlewares/errorHandler'

class DonwloadFileController {
  public router: Router
  storedFileService: DonwloadFileService
  // influxDBManager: InfluxDBManager

  constructor () {
    this.router = Router()
    this.initRoutes()
    this.storedFileService = new DonwloadFileService()
    // this.influxDBManager = new InfluxDBManager()
  }

  private initRoutes () {
    this.router.get('/:id', this.download)
  }

  private download = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // await this.influxDBManager.testInflux()
      const { id } = req.params

      if (!id) throw new HttpError(400, 'It is needed a query parameter')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid query parameter')

      const response = await this.storedFileService.donwloadFile(id)

      res.send(response)
    } catch (error) {
      next(error)
    }
  }
}

export default new DonwloadFileController().router
