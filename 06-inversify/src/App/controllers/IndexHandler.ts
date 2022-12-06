import express = require('express');
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'

@controller('/')
class IndexHandler extends BaseHttpController {
    @httpGet('/')
  public index (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).json({ msg: 'Welcome to Node project' })
  }
}

export default IndexHandler
