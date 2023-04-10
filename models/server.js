const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT

        // this.usersRoutePath = '/api/users'
        // this.authPath       = '/api/auth'

        this.paths = {
            auth       : '/api/auth',
            categories : '/api/categories',
            users      : '/api/users',
            products   : '/api/products',
            search     : '/api/search',
            uploads    : '/api/uploads',
        }

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

        // File upload - load file
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
        // this.app.use(this.authPath, require('../routes/auth'))
        // this.app.use(this.usersRoutePath, require('../routes/users'))

        this.app.use(this.paths.auth,        require('../routes/auth'))
        this.app.use(this.paths.categories,  require('../routes/categories'))
        this.app.use(this.paths.users,       require('../routes/users'))
        this.app.use(this.paths.products,    require('../routes/products'))
        this.app.use(this.paths.search,      require('../routes/search'))
        this.app.use(this.paths.uploads,     require('../routes/uploads'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        })
    }

}

module.exports = Server