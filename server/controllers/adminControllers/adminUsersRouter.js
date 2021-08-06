const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminUsersRouter = {}
const adminUpdateUserData = require('./adminUsersControllers/adminUpdateUserData');
const adminNewApiKey = require('./adminUsersControllers/adminNewApiKey');
const adminGetUsersList = require('./adminUsersControllers/adminGetUsersList');
const adminDeleteUser = require('./adminUsersControllers/adminDeleteUser');

router.post('/newAPIKey',adminAuthMiddleware,adminNewApiKey)
router.post('/getUsersList',adminAuthMiddleware,adminGetUsersList)
router.post('/getUsersList',adminAuthMiddleware,adminGetUsersList)
router.post('/deleteUser',adminAuthMiddleware,adminDeleteUser)


adminUsersRouter.adminUpdateUserData = (req, res) => {adminUpdateUserData(req,res)}





module.exports = router