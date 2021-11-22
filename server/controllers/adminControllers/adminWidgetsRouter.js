const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminAddNewWidget = require('./adminWidgetsControllers/adminAddNewWidget')
const {adminUpdateWidget} = require('./adminWidgetsControllers/adminUpdateWidget')
const adminDeleteWidget = require('./adminWidgetsControllers/adminDeleteWidget')
const adminGetWidgets = require('./adminWidgetsControllers/adminGetWidgets')

router.post('/adminAddNewWidget',adminAuthMiddleware,adminAddNewWidget)
router.post('/adminUpdateWidget',adminAuthMiddleware,adminUpdateWidget)
router.post('/adminDeleteWidget',adminAuthMiddleware,adminDeleteWidget)
router.get('/adminGetWidgets',adminAuthMiddleware,adminGetWidgets)




module.exports = router