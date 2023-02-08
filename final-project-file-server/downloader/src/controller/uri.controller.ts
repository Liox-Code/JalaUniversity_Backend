import { Router, Request, Response } from 'express'
import { UriDTO } from '../dto/uri.dto'
import { UriService } from '../services/uri.service'

class UriController {
  public router: Router
  uriService: UriService

  constructor () {
    this.router = Router()
    this.initRoutes()
    this.uriService = new UriService()
  }

  private initRoutes () {
    this.router.post('/', this.createUri)
    this.router.get('/', this.readUri)
    this.router.put('/', this.updateUri)
    this.router.delete('/', this.deleteUri)
  }

  private createUri = async (req: Request, res: Response) => {
    const { uriId } = req.query

    if (!uriId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof uriId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.uriService.createUri(new UriDTO(uriId, 'uriDirection'))
    res.send(`Uri Created: ${response}`)
  }

  private readUri = async (req: Request, res: Response) => {
    const { uriId } = req.query

    if (!uriId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof uriId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.uriService.readUri(uriId)

    res.send(response)
  }

  private updateUri = async (req: Request, res: Response) => {
    const { uriId } = req.query

    if (!uriId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof uriId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.uriService.updateUri(new UriDTO(uriId, 'uriDirectionUpdated'))
    res.send(`Uri Updated: ${response}`)
  }

  private deleteUri = async (req: Request, res: Response) => {
    const { uriId } = req.query

    if (!uriId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof uriId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.uriService.deleteUri(uriId)

    if (!response) res.send('Error Erasing')

    res.send(`Sucesfully deleted: ${uriId}`)
  }
}

export default new UriController().router
