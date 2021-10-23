const fsExtra = require('fs-extra')
const fs = require('fs')

module.exports = async (req, res) => {
    const file = req.files.uploadingFile
    const fileType = file.mimetype.split('/')[0]
    const desiredMode = 0o2775
    const options = {
        mode: 0o2775
    }
    const today = new Date(Date.now())
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const directoryPath = './public/uploads/' + fileType + '/' + year + '/' + month + '/'
    fsExtra.ensureDir(directoryPath).then(() => {
        const filePath = directoryPath + file.name
        file.mv(filePath, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
            } else {
                res.json({response: 'Uploaded', path: filePath})
            }
        });

    }).catch(err => {
        console.log(err)
        res.end()
    })
}