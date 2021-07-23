const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminReadPath = require('./adminFileManagerControllers/adminReadPath')
const adminReadFile = require('./adminFileManagerControllers/adminReadFile')
const adminDeleteFile = require('./adminFileManagerControllers/adminDeleteFile')
const adminUploadFile = require('./adminFileManagerControllers/adminUploadFile')
const adminUploadFiles = require('./adminFileManagerControllers/adminUploadFiles')
const adminPostThumbnailsUpload = require('./adminFileManagerControllers/adminPostThumbnailsUpload')

router.post('/readPath',adminAuthMiddleware,adminReadPath)
router.post('/readFile',adminAuthMiddleware,adminReadFile)
router.post('/deleteFile',adminAuthMiddleware,adminDeleteFile)
router.post('/uploadFile',adminAuthMiddleware,adminUploadFile)
router.post('/uploadFiles',adminAuthMiddleware,adminUploadFiles)
router.post('/postThumbnailsUpload',adminAuthMiddleware,adminPostThumbnailsUpload)



module.exports = router