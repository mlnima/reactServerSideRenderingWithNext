const fs = require('fs')
const sharp = require('sharp');
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
                        res.json({error: true, data: [], type: undefined});
                        res.end()
                    } else {
                        res.json({error: true, data: fileData.toString('utf8'), type: 'file'});
                        res.end()
                    }
                })
            } else {
                res.json({error: true, data: [], type: undefined});
                res.end()
            }

        } else {
            res.json({error: false, data, type: 'dir'});
            res.end()
        }
    })

};


fileManagerControllers.readFile = (req, res) => {
    const path = req.body.path;
    fs.readFile(path, (err, fileData) => {
        if (err) {
            res.json({error: true, data: [], type: undefined});
            res.end()
        } else {
            res.json({error: true, data: fileData.toString('utf8'), type: 'file'});
            res.end()
        }
    })
}


fileManagerControllers.uploadFile = async (req, res) => {
    const file = req.files.uploadingFile
    const fileType = file.mimetype.split('/')[0]
    const desiredMode = 0o2775
    const options = {
        mode: 0o2775
    }
    const today = new Date(Date.now())
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/'
    fsExtra.ensureDir(directoryPath).then(() => {
        const filePath = directoryPath + file.name
        file.mv(filePath, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
                res.end()
            } else {
                res.json({response: 'Uploaded', path: filePath})
                res.end()
            }
        });

    }).catch(err => {
        console.log(err)
        res.end()
    })
}

fileManagerControllers.postThumbnailsUpload = async (req, res) => {
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


fileManagerControllers.uploadImage = async (req, res) => {
    const file = req.files.uploadingFile;
    const fileType = file.mimetype.split('/')[0];
    const today = new Date(Date.now());
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/';

    fsExtra.ensureDir(directoryPath).then(() => {
        const filePath = directoryPath + file.name;
        const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;

        file.mv(filePathOriginalSize, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
                res.end()
            } else {
                // let imageWidth
                // let imageHeight
                //
                // if (req.body.type='thumbnail'){
                //     imageWidth = 320
                //     imageHeight = 240
                // }else if (req.body.type==='')

                let imageHeight = req.body.type === 'thumbnail' ? 240 :
                    req.body.type = 'gallery' ? 720 : 480;
                let imageWidth = req.body.type === 'thumbnail' ? 320 :
                    req.body.type = 'gallery' ? 960 : 640;

                console.log(req.body)
                console.log('dada information', req.body.type, imageHeight, imageWidth)
                sharp(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, (err, info) => {
                    if (err) {
                        console.log(err)
                        res.sendStatus(500);
                    } else {
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


fileManagerControllers.userImageUpload = async (req, res) => {
    const file = req.files.profileImage
    const userId = req.userData._id
    const directoryPath = './static/uploads/users/' + userId + '/'
    const filePath = directoryPath + file.name + '.png'
    fsExtra.ensureDir(directoryPath).then(() => {

        file.mv(filePath, function (err) {
            if (err) {
                console.log(err)
                res.json({response: 'something is wrong', type: 'error', error: err})
                res.end()
            } else {
                res.json({response: 'Uploaded', path: filePath})
                res.end()
            }
        });

    }).catch(err => {
        console.log(err)
        res.end()
    })

}


module.exports = fileManagerControllers
