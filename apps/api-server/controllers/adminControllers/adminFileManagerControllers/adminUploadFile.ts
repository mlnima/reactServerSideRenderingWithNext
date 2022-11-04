import fs from 'fs';
import fsExtra from 'fs-extra';

const adminUploadFile = async (req, res) => {
    const file = req?.files?.uploadingFile
    const fileType = file.mimetype.split('/')[0]
    const desiredMode = 0o2775
    const options = {
        mode: 0o2775
    }
    const today = new Date(Date.now())
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const directoryPath = './public/uploads/' + fileType + '/' + year + '/' + month + '/'
    fsExtra.ensureDir(directoryPath).then(async () => {
        try {
            const filePath = directoryPath + file.name
            const fileExist =  fs.existsSync(filePath)
            if (fileExist){
                await fs.unlinkSync(filePath)
            }

            file.mv(filePath, function (err) {
                if (err) {
                    res.json({response: 'something is wrong', type: 'error', error: err})
                } else {
                    res.json({response: 'Uploaded', path: filePath})
                }
            });
        }catch (err){
            console.log(err)
        }

    }).catch(err => {
           console.log(err)
        res.end()
    })
}

export default adminUploadFile;