const sharp = require('sharp');
const fsExtra = require('fs-extra')

module.exports = async (req, res) => {
    const file = req.files.profileImage
    const userId = req.userData._id
    const directoryPath = './static/uploads/users/' + userId + '/'
    const filePath = directoryPath + file.name + '.png'
    const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
    fsExtra.ensureDir(directoryPath).then(() => {

        file.mv(filePathOriginalSize, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
                res.end()
            } else {
                let imageHeight = req.body.type === 'profile' ? 180 :
                    req.body.type === 'cover' ? 312 : 720;

                let imageWidth = req.body.type === 'profile' ? 180 :
                    req.body.type === 'cover' ? 820 : 1280;

                sharp(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.sendStatus(500);
                    } else {
                        console.log(filePath)
                        fsExtra.remove(filePathOriginalSize)
                        res.json({response: 'Uploaded', path: process.env.REACT_APP_PRODUCTION_URL + filePath})
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