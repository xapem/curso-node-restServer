const { request, response } = require("express");
const { User, Product, Category } = require("../models");
const { ObjectId } = require('mongoose').Types
// const { isValidObjectId } = require("mongoose");

const allowCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUsers = async ( termino = '' , res = response) => {

    const isMongoID = ObjectId.isValid(termino)

    if( isMongoID ) {
        const user = await User.findById(termino)
        return res.json({
            results: ( user ) ? [ user ] : [] 
        })
    }

    const regex = new RegExp( termino, 'i' )

    const users = await User.find({ 
        $or: [{nombre: regex }, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json({ results: users})
}

const searchProducts = async ( termino = '' , res = response) => {

    const isMongoID = ObjectId.isValid(termino)

    if( isMongoID ) {
        const product = await Product.findById(termino).populate('category', 'nombre')
        return res.json({
            results: ( product ) ? [ product ] : [] 
        })
    }

    const regex = new RegExp( termino, 'i' )

    const products = await Product.find({ nombre: regex, estado: true }).populate('category', 'nombre')


    res.json({
        results: products
    })


}

const searchCategories = async ( termino, res ) => {
    const isMongoID = ObjectId.isValid(termino)

    if( isMongoID ) {
        const category = await Category.findById(id)
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }
    const regex = new RegExp( termino, 'i')
    const categories = await Category.find({nombre: regex, estado: true})

    res.json({ results: categories })

}

const search = (req = request, res = response) => {

    const { collection, termino } = req.params

    if( !allowCollections.includes(collection) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${allowCollections}`
        })
    }

    switch(collection) {
        case 'categories': 
            searchCategories(termino, res)
            break
        case 'products'  : 
            searchProducts(termino, res)
            break
        case 'users'     : 
            searchUsers(termino, res)
            break 
        default:
            res.status(500).json({
                msg: `Se me olvido hacer esta busqueda`
            })
    }
}

module.exports = {
    search
}