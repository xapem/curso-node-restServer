const validarCampos   = require('../middlewares/validar-campos')
const validarJWT      = require('../middlewares/validar-jwt')
const validaRoles     = require('../middlewares/validar-roles')
const filesValidate   = require('../middlewares/validate-file')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...filesValidate
}