import { Request, Response } from 'express'
import { inject } from 'inversify'
import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils'
import { PhotoRepositoryImpl } from '../repository/photoRepositoryImpl'
import { TYPES } from '../type.core'

@controller('/posts')
export class PhotoController implements interfaces.Controller {
    private photoRepository:PhotoRepositoryImpl
    constructor (@inject(TYPES.Photo) photoRepository: PhotoRepositoryImpl) {
        this.photoRepository = photoRepository
    }

  @httpGet('/')
    public async index (@request() req: Request, @response() res: Response) {
        try {
            const posts = await this.photoRepository.findAll()
            res.status(200).json(posts)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
