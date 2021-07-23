const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminGetFormsData = require('./adminFormsControllers/adminGetFormsData')
const adminGetFormData = require('./adminFormsControllers/adminGetFormData')

router.post('/getFormsData',adminAuthMiddleware,adminGetFormsData);
router.post('/getFormData',adminAuthMiddleware,adminGetFormData);


module.exports = router