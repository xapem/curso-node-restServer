const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
// const { validationResult } = require('express-validator')
const User = require('../models/user')

const usersGet = async (req = request, res = response) => {
    // res.send('Hello World')
    // res.json('Hello World')
    
    // res.status(403).json({
    //     msg: 'get API'
    // })

    // const queryParams = req.query
    // const { q, nombre = 'no name', apikey, page = 1, limit } = req.query

    // res.json({
    //     msg: 'get API - Controlador',
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // })

    const { limit = 5, desde = 0 } = req.query
    const query = { estado: true }

    // const users = await User.find(query)
    //     .skip( Number(desde))
    //     .limit(Number(limit))

    // const total = await User.countDocuments(query)

    // const resp = await Promise.all([
    //     User.countDocuments(query),
    //     User.find(query)
    //         .skip( Number(desde))
    //         .limit(Number(limit))
    // ])

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(desde))
            .limit(Number(limit))
    ])

    // res.json({total,users})
    // res.json({resp})
    res.json({total, users})
}

const usersPost = async (req, res = response) => {

    // const errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors)
    // }

    // const {nombre, edad} = req.body
    // const body = req.body
    const {nombre, correo, password, rol} = req.body
    const user = new User( {nombre, correo, password, rol} )

    // Verificar si el correo existe
    // const existeEmail = await User.findOne({correo})
    // if(existeEmail){
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     })
    // }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    
    // Guardar en DB
    await user.save()

    // res.status(201).json({
    //     msg: 'post API - Controlador',
    //     // nombre,
    //     // edad,
    //     user
    // })

    res.json(user)
}

const usersPut = async (req, res = response) => {

    const {id} = req.params
    const { _id, password, google, correo, ...resto } = req.body

    // Todo: Validar contra base de datos
    
    if( password ) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const user = await User.findByIdAndUpdate( id, resto )


    // res.json({
    //     // msg: 'put API - Controlador',
    //     user
    // })

    res.json(user)
}

const usersDelete = async (req, res = response) => {

    const {id} = req.params
    // const uid = req.uid

    //Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id)

    // res.status(500).json({
    //     msg: 'delete API - Controlador',
    //     id
    // })

    const user = await User.findByIdAndUpdate(id, { estado: false })
    // const userAuth = req.user

    res.json(user)
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