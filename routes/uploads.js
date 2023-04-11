const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos, fileValidateUpload } = require('../middlewares/')
const { loadFile, updatedImg, viewImg, updatedImgCloudinary } = require('../controllers/uploads')
const { allowCollections } = require('../helpers')

const router = Router()

router.post('/', fileValidateUpload, loadFile )

router.put('/:collection/:id', [
    fileValidateUpload,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowCollections(c, ['users', 'products']) ),
    validarCampos
], updatedImgCloudinary)
// ], updatedImg)

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowCollections(c, ['users', 'products']) ),
    validarCampos
], viewImg)


module.exports = router