const express = require('express');
const router = express.Router();
const cacheSuccesses = require('../../middlewares/apiCache');

const clientGetMultipleWidgetWithData = require('./clientWidgetsControllers/clientGetMultipleWidgetWithData')
const clientGetWidget = require('./clientWidgetsControllers/clientGetWidget')
const clientSelfWidgetUpdate = require('./clientWidgetsControllers/clientSelfWidgetUpdate')

router.get('/getMultipleWidgetWithData',cacheSuccesses,clientGetMultipleWidgetWithData)
router.post('/getMultipleWidgetWithData',(req,res)=>{
    res.status(404).json({message: 'Route Has Been changed'})
})
router.post('/getWidget',cacheSuccesses,clientGetWidget)
router.post('/clientSelfWidgetUpdate',clientSelfWidgetUpdate)

module.exports = router