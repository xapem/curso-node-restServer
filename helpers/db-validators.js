const Role = require('../models/role')

const esRolValido = async (rol = '') => {
    const existRol = await Role.findOne({rol})
    if( !existRol ){
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

module.exports = {
    esRolValido
}