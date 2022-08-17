const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')


const clientCreateOrder = require('./clientOrdersControllers/clientCreateOrder')


router.post('/create/payPal',authMiddleware,clientCreateOrder)


module.exports = router