const fs = require('fs')
const fsExtra = require('fs-extra')
let fileManagerControllers = {}

fileManagerControllers.readPath = (req, res) => {
    const path = req.body.path;
    console.log(path)
    fs.readdir(path, (err, data) => {
        if (err) {
            if (err.code === 'ENOTDIR') {
                fs.readFile(path, (err, fileData) => {
                    if (err) {
                        res.json({ error: true, data: [], type: undefined });
                        res.end()
                    } else {
                        res.json({ error: true, data: fileData.toString('utf8'), type: 'file' });
                        res.end()
                    }
                })
            } else {
                res.json({ error: true, data: [], type: undefined });
                res.end()
            }

        } else {
            res.json({ error: false, data, type: 'dir' });
            res.end()
        }
    })

};

fileManagerControllers.uploadFile = async (req, res) => {
    const file = req.files.uploadingFile
    const fileType = file.mimetype.split('/')[0]
    console.log(fileType )
    const desiredMode = 0o2775
    const options = {
        mode: 0o2775
    }
    const today = new Date(Date.now())
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month +'/'
     fsExtra.ensureDir(directoryPath).then(()=>{
         const filePath = directoryPath + file.name
         file.mv(filePath, function (err) {
             if (err) {
                 console.log(err)
                 res.json({ response: 'something is wrong', type: 'error',error:err })
                 res.end()
             } else {
                 res.json({ response: 'Uploaded',path:filePath })
                 res.end()
             }
         });

    }).catch(err=>{
         console.log( err)

         res.end()
     })



    console.log(req.body)
    console.log(file)




}

module.exports = fileManagerControllers
// fileManagerController.
// fileManagerController.
// fileManagerController.
// fileManagerController.
// fileManagerController.