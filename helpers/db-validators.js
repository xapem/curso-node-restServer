const Role = require('../models/role')
const User = require('../models/user')

const esRolValido = async (rol = '') => {
    const existRol = await Role.findOne({rol})
    if( !existRol ){
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
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
    esRolValido,
    emailExiste,
    existUserById
}