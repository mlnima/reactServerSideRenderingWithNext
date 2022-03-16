const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminAddNewWidget = require('./adminWidgetsControllers/adminAddNewWidget')
const {adminUpdateWidget} = require('./adminWidgetsControllers/adminUpdateWidget')
const adminDeleteWidget = require('./adminWidgetsControllers/adminDeleteWidget')
const adminGetWidgets = require('./adminWidgetsControllers/adminGetWidgets')
const adminPanelGetWidgets = require('./adminWidgetsControllers/adminPanelGetWidgets')

router.post('/adminAddNewWidget',adminAuthMiddleware,adminAddNewWidget)
router.post('/adminUpdateWidget',adminAuthMiddleware,adminUpdateWidget)
router.post('/adminDeleteWidget',adminAuthMiddleware,adminDeleteWidget)
router.get('/adminGetWidgets',adminAuthMiddleware,adminGetWidgets)
router.get('/adminPanelGetWidgets',adminAuthMiddleware,adminPanelGetWidgets)




module.exports = router