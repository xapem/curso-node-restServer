const { Router } = require('express')
const { check } = require('express-validator')
// const Role = require('../models/role')
const { esRolValido } = require('../helpers/db-validators')
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch 
} = require('../controllers/users')
const { validarCampos, emailExiste, existUserById } = require('../middlewares/validar-campos')

const router = Router()


router.get('/',    usersGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
],   usersPost)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom( esRolValido ),
    validarCampos
], usersPut)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserById ),
    validarCampos
], usersDelete)

router.patch('/',  usersPatch)

module.exports = router