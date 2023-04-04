const { validationResult } = require('express-validator')
const User = require('../models/user')

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next()
}

const emailExiste =  async ( correo = '' ) => {
    const existeEmail = await User.findOne({correo})
    if(existeEmail){
        // return res.status(400).json({
        //     msg: 'El correo ya esta registrado'
        // })

        throw new Error(`El correo ${correo}, ya esta registrado`)
    }
}

const existUserById =  async ( id = '' ) => {
    const existUser = await User.findById(id)
    if(!existUser){
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    validarCampos,
    emailExiste,
    existUserById
}