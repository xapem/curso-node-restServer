const { response, request } = require('express')
const { Product } = require('../models')
const { body } = require('express-validator')

const getProducts = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query
    const query = { estado: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'nombre')
            .populate('category', 'nombre')
            .skip( Number( from ) )
            .limit( Number ( limit ))
    ])

    res.json({
        total,
        products
    })
}

const getProductById = async (req = request, res = response) => {
    const {id} = req.params
    const product = await Product.findById(id)
                                    .populate('user', 'nombre')
                                    .populate('category', 'nombre')
    res.json(product)
}

const createProduct = async (req = request, res = response) => {
    const { estado, user, ...body } = req.body

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data)
    await product.save()
    
    res.json(product)
}

const updatedProduct = async (req = request, res = response) => {
    const {id} = req.params
    const {estado, user, ...body} = req.body

    if( body.nombre ) {
        body.nombre = body.nombre.toUpperCase()
    }

    body.user = req.user._id
    const product = await Product.findByIdAndUpdate(id, body, { new: true })
    res.json( product )
}

const deleteProduct = async (req = request, res = response) => {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate( id, { estado: false }, { new: true })
    res.json(product)
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updatedProduct,
    deleteProduct
}