// import { AppDataSource } from './database/dataSource'
import App from './app'

(async () => {
  try {
    // await AppDataSource.initialize()
    const app = new App()
    app.initConfig()
    app.build()
    app.listen()
  } catch (err) {
    console.log(err)
  }
})()
