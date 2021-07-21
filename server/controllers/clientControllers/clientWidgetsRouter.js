const express = require('express');
const router = express.Router();
const cacheSuccesses = require('../../middlewares/apiCache');

const clientGetSingleWidgetData = require('./clientWidgetsControllers/clientGetSingleWidgetData')
const clientGetMultipleWidgetWithData = require('./clientWidgetsControllers/clientGetMultipleWidgetWithData')

router.post('/getSingleWidgetData',cacheSuccesses,clientGetSingleWidgetData)
router.post('/getMultipleWidgetWithData',cacheSuccesses,clientGetMultipleWidgetWithData)

module.exports = router