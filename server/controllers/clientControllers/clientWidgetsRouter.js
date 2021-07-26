const express = require('express');
const router = express.Router();
const cacheSuccesses = require('../../middlewares/apiCache');

const clientGetSingleWidgetData = require('./clientWidgetsControllers/clientGetSingleWidgetData')
const clientGetMultipleWidgetWithData = require('./clientWidgetsControllers/clientGetMultipleWidgetWithData')
const clientGetWidget = require('./clientWidgetsControllers/clientGetWidget')
const clientGetWidgetsWithData = require('./clientWidgetsControllers/clientGetWidgetsWithData')
const clientSelfWidgetUpdate = require('./clientWidgetsControllers/clientSelfWidgetUpdate')

router.post('/getSingleWidgetData',cacheSuccesses,clientGetSingleWidgetData)
router.post('/getMultipleWidgetWithData',cacheSuccesses,clientGetMultipleWidgetWithData)
router.post('/getWidget',cacheSuccesses,clientGetWidget)
router.post('/getWidgetsWithData',cacheSuccesses,clientGetWidgetsWithData)
router.post('/clientSelfWidgetUpdate',clientSelfWidgetUpdate)

module.exports = router