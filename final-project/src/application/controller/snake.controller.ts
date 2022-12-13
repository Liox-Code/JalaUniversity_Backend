import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'

@controller('/')
class IndexHandler extends BaseHttpController {
    @httpGet('/')
  public index (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ msg: 'Welcome to Node project' })
  }
}

export default IndexHandler
