const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'git'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
        // const {archivo} = req.files;
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length - 1]

        // Validar extension
        // const extensionesValidas = ['png', 'jpg', 'jpeg', 'git']

        if(!extensionesValidas.includes( extension )){
            return reject(`La extension ${extension} no es permitida ${extensionesValidas}`)
            // return res.status(400).json({msg: `La extension ${extension} no es permitida, ${extensionesValidas}`})
        }

        const nombreTemp = uuidv4() + '.' + extension

        const uploadPath = path.join( __dirname, '../uploads/', carpeta , nombreTemp)
        
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
                // console.log(err)
                // return res.status(500).json({err});
            }

            resolve( nombreTemp )
            // res.json({msg: 'File uploaded to ' + uploadPath});
        });
    })
}

module.exports = {
    uploadFile
}