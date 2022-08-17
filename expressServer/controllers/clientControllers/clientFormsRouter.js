const express = require('express');
const router = express.Router();

const clientSaveFormData = require('./clientFormsControllers/clientSaveFormData')

router.post('/saveFormData',clientSaveFormData)

module.exports = router