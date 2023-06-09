// {
//     nombre: 'Adhamin',
//     correo: 'adhamin055@gmail.com',
//     password: 'ksdjfjadkfjafd',
//     img: '12212edsfsf',
//     rol: '232323322'
//     estado: false,
//     google: false
// }

const {Schema, model} = require('mongoose')

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject()
    return user
}

module.exports = model( 'User', UserSchema )