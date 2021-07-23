const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const clientUserImageUpload = require('./clientFileManagerControllers/clientUserImageUpload')


router.post('/userImageUpload',authMiddleware,clientUserImageUpload)

module.exports = router