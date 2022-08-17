const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminCommandExecutor = require('./adminTerminalControllers/adminCommandExecutor')


router.post('/commandExecutor',adminAuthMiddleware,adminCommandExecutor)


module.exports = router