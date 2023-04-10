const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { loadFile } = require('../controllers/uploads')

const router = Router()

router.post('/', loadFile )


module.exports = router