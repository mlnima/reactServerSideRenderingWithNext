const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const clientUserImageUpload = require('./clientFileManagerControllers/clientUserImageUpload')
const clientUserPostImageUpload = require('./clientFileManagerControllers/clientUserPostImageUpload')


router.post('/userImageUpload',authMiddleware,clientUserImageUpload)
router.post('/userPostImageUpload',clientUserPostImageUpload)

module.exports = router