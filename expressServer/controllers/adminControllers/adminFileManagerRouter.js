const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminReadPath = require('./adminFileManagerControllers/adminReadPath')
const adminReadFile = require('./adminFileManagerControllers/adminReadFile')
const adminDeleteFile = require('./adminFileManagerControllers/adminDeleteFile')
const adminUploadFile = require('./adminFileManagerControllers/adminUploadFile')
const adminUploadFiles = require('./adminFileManagerControllers/adminUploadFiles')
const adminPostThumbnailsUpload = require('./adminFileManagerControllers/adminPostThumbnailsUpload')
const adminCreateNewFileOrFolder = require('./adminFileManagerControllers/adminCreateNewFileOrFolder')
const adminUpdateTranslationsFile = require('./adminFileManagerControllers/adminUpdateTranslationsFile')
const adminReadTranslationsFile = require('./adminFileManagerControllers/adminReadTranslationsFile')

router.post('/readPath',adminAuthMiddleware,adminReadPath)
router.post('/readFile',adminAuthMiddleware,adminReadFile)
router.post('/deleteFile',adminAuthMiddleware,adminDeleteFile)
router.post('/uploadFile',adminAuthMiddleware,adminUploadFile)
router.post('/uploadFiles',adminAuthMiddleware,adminUploadFiles)
router.post('/postThumbnailsUpload',adminAuthMiddleware,adminPostThumbnailsUpload)
router.post('/create',adminAuthMiddleware,adminCreateNewFileOrFolder)
router.post('/updateTranslationsFile',adminAuthMiddleware,adminUpdateTranslationsFile)
router.post('/readTranslationsFile',adminAuthMiddleware,adminReadTranslationsFile)

module.exports = router