import { Request, Response } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { UserEntity } from '../../core/domain/entities/user.entity'
import { UserService } from '../../core/domain/services/user.service'

@controller('/users')
class UserController extends BaseHttpController {
  constructor (
    @inject(TYPES.UserService) private userService: UserService
  ) {
    super()
  }

  @httpGet('/test')
  public async test (req: Request, res: Response) {
    const scoreEntity: UserEntity = {
      userId: 1,
      name: 'Liox'
    }
    const user: UserEntity = await this.userService.createUser(scoreEntity)
    res.status(200).json({ msg: user })
  }
}

export default UserController
