const sharp = require('sharp');
const fsExtra = require('fs-extra')

module.exports = async (req, res) => {
    const file = req.files.uploadingFile
    const fileType = file.mimetype.split('/')[0]
    const today = new Date(Date.now())
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/';
    fsExtra.ensureDir(directoryPath).then(() => {
        const filePath = directoryPath + file.name
        const filePathOriginalSize = directoryPath + 'originalSize_' + file.name

        file.mv(filePathOriginalSize, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
                res.end()
            } else {
                sharp(filePathOriginalSize).resize(320, 240).toFile(filePath, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.sendStatus(500);
                    } else {
                        console.log(info)
                        fsExtra.remove(filePathOriginalSize)
                        res.json({response: 'Uploaded', path: filePath})
                        res.end()
                    }

                })


            }
        });

    }).catch(err => {
        console.log(err)
        res.end()
    })

}