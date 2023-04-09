const {Router} = require('express')
const {check} = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const { createCategory, getCategories, updatedCategory, deleteCategory, getCategoryById } = require('../controllers/categories')
const { existCategoryById } = require('../helpers/db-validators')
const router = Router()

router.get('/', getCategories)

router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existCategoryById),
    validarCampos
], getCategoryById)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory)


router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existCategoryById),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], updatedCategory)


router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existCategoryById),
    validarCampos
], deleteCategory)


module.exports = router