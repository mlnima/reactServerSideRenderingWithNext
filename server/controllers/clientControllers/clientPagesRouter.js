const express = require('express');
const router = express.Router();
const cacheSuccesses = require('../../middlewares/apiCache');

const clientGetPageData = require('./clientPagesControllers/clientGetPageData')

router.post('/getPageData',cacheSuccesses,clientGetPageData)

module.exports = router