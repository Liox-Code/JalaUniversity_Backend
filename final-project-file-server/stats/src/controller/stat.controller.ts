import { Router, Request, Response } from 'express'
import { StatService } from '../services/stat.service'

class StatController {
  public router: Router
  statService: StatService = new StatService()

  constructor () {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.get('/', this.getStat)
    this.router.post('/', this.uploadStat)
  }

  private async getStat (req: Request, res: Response) {
    res.send('You sent: Stat')
  }

  private uploadStat (req: Request, res: Response) {
    res.send('You sent: upload Stat')
  }
}

export default new StatController().router
