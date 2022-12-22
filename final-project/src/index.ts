import App from './app'
import { AppDataSource } from './database/dataSource';

(async () => {
  try {
    await AppDataSource.initialize()
    const app = new App()
    app.initConfig()
    app.build()
    app.listen()
  } catch (err) {
    console.log(err)
  }
})()
