const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminAddNewWidget = require('./adminWidgetsControllers/adminAddNewWidget')

router.post('/addNewWidget',adminAuthMiddleware,adminAddNewWidget)



module.exports = router