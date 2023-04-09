const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

CategorySchema.methods.toJSON = function() {
    const { __v, estado, ...category } = this.toObject()
    return category
}

module.exports = model('Category', CategorySchema)