import fsExtra from 'fs-extra';
import sharp from 'sharp';

const adminPostThumbnailsUpload = async (req, res) => {
    const file = req.files?.uploadingFile
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
            } else {
                sharp(filePathOriginalSize).resize(320, 240).toFile(filePath, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.status(500);
                    } else {
                        fsExtra.remove(filePathOriginalSize)
                        res.json({response: 'Uploaded', path: filePath})
                    }

                })


            }
        });

    }).catch(err => {
        console.log(err)
        res.end()
    })

}

export default adminPostThumbnailsUpload;