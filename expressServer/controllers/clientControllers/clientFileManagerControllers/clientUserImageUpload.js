const sharp = require('sharp');
const fsExtra = require('fs-extra')
const userSchema = require('../../../models/userSchema');

module.exports = async (req, res) => {
    const file = req.files.profileImage
    const userId = req.userData._id
    const directoryPath = './public/uploads/users/' + userId + '/'
    const filePath = directoryPath + file.name + '.png'
    const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
    fsExtra.ensureDir(directoryPath).then(() => {

        file.mv(filePathOriginalSize, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
            } else {
                let imageHeight = req.body.type === 'profile' ? 180 :
                    req.body.type === 'cover' ? 312 : 720;

                let imageWidth = req.body.type === 'profile' ? 180 :
                    req.body.type === 'cover' ? 820 : 1280;

                sharp(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.status(500);
                    } else {
                        const imageUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL + filePath.replace('.','')

                        userSchema.findByIdAndUpdate(req.userData._id,{profileImage:imageUrl}).exec().then(()=>{
                            fsExtra.remove(filePathOriginalSize)
                            res.json({response: 'Uploaded', path: imageUrl})
                        }).catch(()=>{
                            res.status(500);
                        })

                    }
                })
            }
        });

    }).catch(err => {
        console.log(err)
        res.end()
    })

}