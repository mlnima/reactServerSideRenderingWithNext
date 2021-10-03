const express = require('express');
const router = express.Router();
const cacheSuccesses = require('../../middlewares/apiCache');

const clientGetPageData = require('./clientPagesControllers/clientGetPageData')
const clientGetPagesData = require('./clientPagesControllers/clientGetPagesData')

router.post('/getPageData',cacheSuccesses,clientGetPageData)
router.get('/getPagesData',cacheSuccesses,clientGetPagesData)

module.exports = router