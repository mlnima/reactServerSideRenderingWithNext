const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminAddNewWidget = require('./adminWidgetsControllers/adminAddNewWidget')
const {adminUpdateWidget} = require('./adminWidgetsControllers/adminUpdateWidget')
const adminDeleteWidget = require('./adminWidgetsControllers/adminDeleteWidget')


router.post('/addNewWidget',adminAuthMiddleware,adminAddNewWidget)
router.post('/updateWidget',adminAuthMiddleware,adminUpdateWidget)
router.post('/deleteWidget',adminAuthMiddleware,adminDeleteWidget)




module.exports = router