const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const adminUsersRouter = {}
const adminUpdateUserData = require('./adminUsersControllers/adminUpdateUserData');
const adminNewApiKey = require('./adminUsersControllers/adminNewApiKey');
const adminGetUsersList = require('./adminUsersControllers/adminGetUsersList');
const adminDeleteUser = require('./adminUsersControllers/adminDeleteUser');
const adminGetUser = require('./adminUsersControllers/adminGetUser');

router.post('/newAPIKey',adminAuthMiddleware,adminNewApiKey);
router.post('/getUsersList',adminAuthMiddleware,adminGetUsersList);
router.post('/getUsersList',adminAuthMiddleware,adminGetUsersList);
router.post('/deleteUser',adminAuthMiddleware,adminDeleteUser);
router.post('/getUser',adminAuthMiddleware,adminGetUser);

adminUsersRouter.adminUpdateUserData = (req, res) => {adminUpdateUserData(req,res)};

module.exports = router