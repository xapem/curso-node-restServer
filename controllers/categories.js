const { response, request } = require("express");
const { Category } = require('../models')

const getCategories = async (req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = { estado: true }

    const [total, categories] = await Promise.all([
        await Category.countDocuments(query),
        await Category.find(query)
            .populate('user', 'nombre')
            .skip(from)
            .limit(limit)
    ])

    res.json({
        total,
        categories
    })
}

const getCategoryById = async (req = request, res = response) => {
    const {id} = req.params
    const category = await Category.findById(id).populate('user', 'nombre')
    res.json({category})
}

const createCategory = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase()
    const categoryDB = await Category.findOne({nombre})

    if( categoryDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.nombre }, ya existe`
        })
    }

    const data = {
        nombre,
        user: req.user._id
    }
    const category = new Category(data)
    
    await category.save()
    res.status(201).json(category)

}


const updatedCategory = async (req = request, res = response) => {
    const {id} = req.params
    const { estado, user, ...data } = req.body
    
    data.nombre = data.nombre.toUpperCase()
    data.user   = req.user._id

    const category = await Category.findByIdAndUpdate(id, data, { new: true })
    res.json(category)
}


const deleteCategory = async (req = request, res = response) => {
    const {id} = req.params
    const category = await Category.findByIdAndUpdate( id, {estado: false}, {new: true})
    res.json({category})
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updatedCategory,
    deleteCategory
}