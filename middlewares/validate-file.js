const { response, request } = require("express")

const fileValidateUpload = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg: 'No files were uploaded - validar Archivo Subir'});
    }

    next()
}

module.exports = {
    fileValidateUpload
}