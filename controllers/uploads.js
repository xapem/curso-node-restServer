const { request, response } = require("express");
const path = require('path')
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )
const fs = require('fs')

const { uploadFile } = require("../helpers");
const { User, Product } = require('../models')


const loadFile = async (req = request, res = response) => {

    try {
        // const nombre = await uploadFile(req.files, ['txt', 'md'] , 'textos')
        const nombre = await uploadFile(req.files, undefined, 'imgs')
        res.json({ nombre })

    } catch(err) {
        res.status(400).json({err})
    }


}

const updatedImg = async (req = request, res = response) => {

    
    const {id, collection} = req.params
    let model;

    switch( collection ) {
        case 'users':
            model = await User.findById(id)
            if( !model ) {
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`})
            }
            break
        case 'products':
            model = await Product.findById(id)
            if( !model ) {
                return res.status(400).json({msg: `No existe un producto con el id ${id}`})
            }
            break
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    // Limpiar imagenes previas
    if( model.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', collection, model.img )
        if ( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen )
        }
    }

    const nombre = await uploadFile( req.files, undefined, collection )
    model.img = nombre

    await model.save()

    res.json({model})
}

const updatedImgCloudinary = async (req = request, res = response) => {

    
    const {id, collection} = req.params
    let model;

    switch( collection ) {
        case 'users':
            model = await User.findById(id)
            if( !model ) {
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`})
            }
            break
        case 'products':
            model = await Product.findById(id)
            if( !model ) {
                return res.status(400).json({msg: `No existe un producto con el id ${id}`})
            }
            break
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    // Limpiar imagenes previas
    if( model.img ) {
        const nombreArr     = model.img.split('/')
        const nombre        = nombreArr[ nombreArr.length - 1]
        const [ public_id ] = nombre.split('.')
        await cloudinary.uploader.destroy(public_id)
    }
    // console.log(req.files.archivo)
    const { tempFilePath } = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath )
    model.img = secure_url
    await model.save()
    res.json({model})
}

const viewImg = async (req = request, res = response) => {

    const {id, collection} = req.params
    let model;

    switch( collection ) {
        case 'users':
            model = await User.findById(id)
            if( !model ) {
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`})
            }
            break
        case 'products':
            model = await Product.findById(id)
            if( !model ) {
                return res.status(400).json({msg: `No existe un producto con el id ${id}`})
            }
            break
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }

    // Limpiar imagenes previas
    if( model.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', collection, model.img )
        if ( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen )
        }
    }

    const pathPlaceHolder = path.join( __dirname, '../assets/no-image.jpg')
    res.sendFile(pathPlaceHolder)
}

module.exports = {
    loadFile,
    updatedImg,
    updatedImgCloudinary,
    viewImg
}