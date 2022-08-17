const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminGetOrders = require('./adminOdersControllers/adminGetOrders')

router.post('/getOrders',adminAuthMiddleware,adminGetOrders)


module.exports = router