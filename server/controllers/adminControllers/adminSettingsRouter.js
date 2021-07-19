const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminUpdateSettings = require('./adminSettingsControllers/adminUpdateSettings')
const adminGetSettings = require('./adminSettingsControllers/adminGetSettings')

router.post('/update',adminUpdateSettings)
router.post('/getSetting',adminGetSettings)

module.exports = router