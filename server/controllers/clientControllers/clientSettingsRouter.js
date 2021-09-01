const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const clientGetMultipleSettings = require('./clientSettingsControllers/clientGetMultipleSettings')
const cacheSuccesses = require('../../middlewares/apiCache');

router.get('/getMultipleSettings',cacheSuccesses,clientGetMultipleSettings)
module.exports = router