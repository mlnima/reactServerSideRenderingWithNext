const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminUpdateSettings = require('./adminSettingsControllers/adminUpdateSettings')
const adminGetSettings = require('./adminSettingsControllers/adminGetSettings')
const adminClearCaches = require('./adminSettingsControllers/adminClearCaches')

router.post('/update',adminAuthMiddleware,adminUpdateSettings)
router.get('/getSetting',adminAuthMiddleware,adminGetSettings)
//router.post('/clearCaches',adminAuthMiddleware,adminClearCaches)

module.exports = router