const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT

        this.usersRoutePath = '/api/users'
        this.authPath = '/api/auth'

        // Conectar a base de datos
        this.connectionDB()

        // Todo: Middlewares: Son funcionales que le añaden al webServer
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }

    async connectionDB() {
        await dbConnection()
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Parseo y Lectura del Body
        this.app.use( express.json() )

        //Directorio publico
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usersRoutePath, require('../routes/users'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        })
    }

}

module.exports = Server