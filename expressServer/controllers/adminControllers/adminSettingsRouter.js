const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminUpdateSettings = require('./adminSettingsControllers/adminUpdateSettings')
const adminGetSettings = require('./adminSettingsControllers/adminGetSettings')
const adminGetMultipleSettings = require('./adminSettingsControllers/adminGetMultipleSettings')
const adminClearCaches = require('./adminSettingsControllers/adminClearCaches')

router.post('/update',adminAuthMiddleware,adminUpdateSettings)
router.get('/getSetting',adminAuthMiddleware,adminGetSettings)
router.get('/getMultipleSetting',adminAuthMiddleware,adminGetMultipleSettings)
//router.post('/clearCaches',adminAuthMiddleware,adminClearCaches)

module.exports = router