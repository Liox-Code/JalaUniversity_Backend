import App from './app';

(async () => {
    try {
        const app = new App()
        app.initConfig()
        app.build()
        app.listen()
    } catch (err) {
        console.log(err)
    }
})()
