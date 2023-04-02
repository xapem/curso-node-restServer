const { response, request } = require('express')

const usersGet = (req = request, res = response) => {
    // res.send('Hello World')
    // res.json('Hello World')
    
    // res.status(403).json({
    //     msg: 'get API'
    // })

    // const queryParams = req.query
    const { q, nombre = 'no name', apikey, page = 1, limit } = req.query

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}
    

const usersPost = (req, res = response) => {

    // const body = req.body
    const {nombre, edad} = req.body

    res.status(201).json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}

const usersPut = (req, res = response) => {

    const {id} = req.params

    res.status(400).json({
        msg: 'put API - Controlador',
        id
    })
}

const usersDelete = (req, res = response) => {
    res.status(500).json({
        msg: 'delete API - Controlador'
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}