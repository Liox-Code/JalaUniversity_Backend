import 'reflect-metadata'
import { Application, json } from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './inversify.config'
import './controllers/photo.controller'

class App {
    public port?: number
    private server: InversifyExpressServer
    private app: Application

    constructor () {
        this.port = 8889
        this.server = new InversifyExpressServer(container)
    }

    public initConfig () {
        this.server.setConfig((app: Application) => {
            app.use(json({ limit: '5mb' }))
        })
    }

    public build () {
        this.app = this.server.build()
    }

    public listen () {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

export default App
