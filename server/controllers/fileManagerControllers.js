const fs = require('fs')
const sharp = require('sharp');
const fsExtra = require('fs-extra')
let fileManagerControllers = {}

// fileManagerControllers.readPath = (req, res) => {
//     const path = req.body.path;
//     console.log(path)
//     fs.readdir(path, (err, data) => {
//         if (err) {
//             if (err.code === 'ENOTDIR') {
//                 fs.readFile(path, (err, fileData) => {
//                     if (err) {
//                         res.json({error: true, data: [], type: undefined});
//                         res.end()
//                     } else {
//                         res.json({error: true, data: fileData.toString('utf8'), type: 'file'});
//                         res.end()
//                     }
//                 })
//             } else {
//                 res.json({error: true, data: [], type: undefined});
//                 res.end()
//             }
//
//         } else {
//             res.json({error: false, data, type: 'dir'});
//             res.end()
//         }
//     })
//
// };


// fileManagerControllers.readFile = (req, res) => {
//     const path = req.body.path;
//     fs.readFile(path, (err, fileData) => {
//         if (err) {
//             res.json({error: true, data: [], type: undefined});
//             res.end()
//         } else {
//             res.json({error: false, data: fileData.toString('utf8'), type: 'file'});
//             res.end()
//         }
//     })
// }

// fileManagerControllers.deleteFile = (req, res) => {
//     const filePath = req.body.filePath;
//     fs.unlink(filePath, err => {
//         if (err) {
//             res.json({error: true, data: 'something happened', type: undefined});
//             res.end()
//         } else {
//             res.json({error: false, data: 'deleted'});
//             res.end()
//         }
//     })
// }


// fileManagerControllers.uploadFile = async (req, res) => {
//     const file = req.files.uploadingFile
//     const fileType = file.mimetype.split('/')[0]
//     const desiredMode = 0o2775
//     const options = {
//         mode: 0o2775
//     }
//     const today = new Date(Date.now())
//     const year = today.getFullYear()
//     const month = today.getMonth() + 1
//     const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/'
//     fsExtra.ensureDir(directoryPath).then(() => {
//         const filePath = directoryPath + file.name
//         file.mv(filePath, function (err) {
//             if (err) {
//                 console.log(err)
//                 res.json({response: 'something is wrong', type: 'error', error: err})
//                 res.end()
//             } else {
//                 res.json({response: 'Uploaded', path: filePath})
//                 res.end()
//             }
//         });
//
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
// }

// fileManagerControllers.postThumbnailsUpload = async (req, res) => {
//     const file = req.files.uploadingFile
//     const fileType = file.mimetype.split('/')[0]
//     const today = new Date(Date.now())
//     const year = today.getFullYear()
//     const month = today.getMonth() + 1
//     const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/';
//     fsExtra.ensureDir(directoryPath).then(() => {
//         const filePath = directoryPath + file.name
//         const filePathOriginalSize = directoryPath + 'originalSize_' + file.name
//
//         file.mv(filePathOriginalSize, function (err) {
//             if (err) {
//                 console.log(err)
//                 res.json({response: 'something is wrong', type: 'error', error: err})
//                 res.end()
//             } else {
//                 sharp(filePathOriginalSize).resize(320, 240).toFile(filePath, (err, info) => {
//                     if (err) {
//                         console.log(err)
//                         res.sendStatus(500);
//                     } else {
//                         console.log(info)
//                         fsExtra.remove(filePathOriginalSize)
//                         res.json({response: 'Uploaded', path: filePath})
//                         res.end()
//                     }
//
//                 })
//
//
//             }
//         });
//
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
//
// }

//
// fileManagerControllers.uploadFiles = async (req, res) => {
//
//     const file = req.files.uploadingFile;
//     const fileType = file.mimetype.split('/')[0];
//     const today = new Date(Date.now());
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/';
//
//     fsExtra.ensureDir(directoryPath).then(() => {
//         const filePath = directoryPath + file.name;
//         const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
//
//         if(fileType==='image'){
//             file.mv(filePathOriginalSize, function (err) {
//                 if (err) {
//                     console.log(err)
//                     res.json({response: 'something is wrong', type: 'error', error: err})
//                     res.end()
//                 } else {
//                     let imageHeight = req.body.type === 'thumbnail' ? 180 :
//                         req.body.type === 'gallery' ? 720 : 720;
//
//                     let imageWidth = req.body.type === 'thumbnail' ? 320 :
//                         req.body.type === 'gallery' ? 1280 : 1280;
//
//                     sharp(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, (err, info) => {
//                         if (err) {
//                             console.log(err)
//                             res.sendStatus(500);
//                         } else {
//                             fsExtra.remove(filePathOriginalSize)
//                             res.json({response: 'Uploaded', path: filePath})
//                             res.end()
//                         }
//                     })
//                 }
//             });
//         }else {
//             file.mv(filePath, function (err) {
//                 if (err) {
//                     console.log(err)
//                     res.json({response: 'something is wrong', type: 'error', error: err})
//                     res.end()
//                 } else {
//
//                     res.json({response: 'Uploaded', path: filePath})
//                     res.end()
//                 }
//             });
//         }
//
//
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
// }


// fileManagerControllers.userImageUpload = async (req, res) => {
//     const file = req.files.profileImage
//     const userId = req.userData._id
//     const directoryPath = './static/uploads/users/' + userId + '/'
//     const filePath = directoryPath + file.name + '.png'
//     const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
//     fsExtra.ensureDir(directoryPath).then(() => {
//
//         file.mv(filePathOriginalSize, function (err) {
//             if (err) {
//                 console.log(err)
//                 res.json({response: 'something is wrong', type: 'error', error: err})
//                 res.end()
//             } else {
//                 let imageHeight = req.body.type === 'profile' ? 180 :
//                     req.body.type === 'cover' ? 312 : 720;
//
//                 let imageWidth = req.body.type === 'profile' ? 180 :
//                     req.body.type === 'cover' ? 820 : 1280;
//
//                 sharp(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, (err, info) => {
//                     if (err) {
//                         console.log(err)
//                         res.sendStatus(500);
//                     } else {
//                         console.log(filePath)
//                         fsExtra.remove(filePathOriginalSize)
//                         res.json({response: 'Uploaded', path: filePath})
//                         res.end()
//                     }
//                 })
//             }
//         });
//
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
//
// }


module.exports = fileManagerControllers
