const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async ( req, res = response ) => {

    const { correo, password } = req.body

    try {

        //Verificar si el email existe
        const user = await User.findOne({ correo })
        if( !user ) {
            return res.status(400).json({
                msg: 'User or Password do not correct - correo'
            })
        }

        //Verificar si el usuario esta activo
        if( !user.estado ) {
            return res.status(400).json({
                msg: 'User your estado : false'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'The password of the user is incorrect'
            })
        }

        //Generar el JWT
        const token = await generarJWT( user.id )

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}