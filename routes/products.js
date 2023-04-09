const {Router} = require('express')
const {check} = require('express-validator')
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updatedProduct, 
    deleteProduct 
} = require('../controllers')
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares')
const { existCategoryById, existProductById, existNameProduct } = require('../helpers/db-validators')

const router = Router()

router.get('/', getProducts)

router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existProductById ),
    validarCampos
], getProductById)

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('nombre').custom( existNameProduct ),
    check('category', 'No es un id de Mongo valido').isMongoId(),
    check('category').custom( existCategoryById ),
    validarCampos
], createProduct)

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existProductById ),
    validarCampos
], updatedProduct)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existProductById ),
    validarCampos
], deleteProduct)

module.exports = router