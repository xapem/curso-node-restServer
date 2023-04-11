// const Role = require('../models/role')
// const User = require('../models/user')

const { Category, User, Role, Product } = require('../models')

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
        throw new Error(`El id de usuario no existe ${id}`)
    }
}

const existCategoryById = async ( id = '' ) => {
    const existCategory = await Category.findById(id)
    if(!existCategory){
        throw new Error(`El id de categoria no existe: ${id}`)
    }
}

const existProductById = async ( id = '' ) => {
    const existProduct = await Product.findById(id)
    if(!existProduct){
        throw new Error(`El id de product no existe: ${id}`)
    }
}

const existNameProduct = async ( nombre = '' ) => {
    nombre = nombre.toUpperCase()
    const existProduct = await Product.findOne({nombre})
    if( existProduct ) {
        throw new Error(`El nombre del producto ya existe`)
    }
}

const allowCollections = ( collection = '', collecionts = []) => {

    const include = collecionts.includes( collection )
    if( !include ) {
        throw new Error(`La extension ${collection} no es permitida, ${collecionts}`)
    }
    return true
}

module.exports = {
    esRolValido,
    emailExiste,
    existUserById,
    existCategoryById,
    existProductById,
    existNameProduct,
    allowCollections
}