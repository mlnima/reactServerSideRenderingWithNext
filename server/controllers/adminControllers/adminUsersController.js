const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminUsersController = {}
const adminUpdateUserData = require('./adminUsersController/adminUpdateUserData');
const adminNewApiKey = require('./adminUsersController/adminNewApiKey');
const adminGetUsersList = require('./adminUsersController/adminGetUsersList');

router.post('/newAPIKey',adminAuthMiddleware,adminNewApiKey)
router.post('/getUsersList',adminAuthMiddleware,adminGetUsersList)


adminUsersController.adminUpdateUserData = (req,res) => {adminUpdateUserData(req,res)}





module.exports = router