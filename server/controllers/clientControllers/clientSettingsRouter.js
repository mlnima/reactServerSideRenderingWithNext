const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const clientGetMultipleSettings = require('./clientSettingsControllers/clientGetMultipleSettings')

router.post('/getMultipleSettings',clientGetMultipleSettings)
module.exports = router