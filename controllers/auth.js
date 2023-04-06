const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')


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

const googleSignIn = async (req, res = response) => {

    const {id_token} = req.body

    try {
        const {nombre, img, correo} = await googleVerify( id_token )

        let user = await User.findOne({correo})

        if( !user ) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            }

            user = new User(data)
            await user.save()

        }

        if( !user.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

    

}

module.exports = {
    login,
    googleSignIn
}