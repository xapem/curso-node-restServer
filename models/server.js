const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT || 8080
        this.usersRoutePath = '/api/users'

        // Todo: Middlewares: Son funcionales que le añaden al webServer
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
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
        this.app.use(this.usersRoutePath, require('../routes/users'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        })
    }

}

module.exports = Server
