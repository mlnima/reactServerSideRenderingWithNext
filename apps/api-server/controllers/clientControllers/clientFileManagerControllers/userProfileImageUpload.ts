import sharp from 'sharp'
import fsExtra from 'fs-extra'
import userSchema from "@schemas/userSchema";


//need to move to file-server
const userProfileImageUpload =  async (req, res) => {
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

                sharp(filePathOriginalSize).resize(180, 180).toFile(filePath, (err, info) => {
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

export default userProfileImageUpload