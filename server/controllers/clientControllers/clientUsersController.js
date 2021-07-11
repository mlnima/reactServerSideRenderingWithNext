const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')

const clientUsersController ={}
const clientUpdateUserData = require('./clientUsersControllers/clientUpdateUserData')
const clientRegisterNewUser = require('./clientUsersControllers/clientRegisterNewUser')
const clientUserLogin = require('./clientUsersControllers/clientUserLogin')
const clientResetUserPassword = require('./clientUsersControllers/clientResetUserPassword')
const clientGetUserPreviewData = require('./clientUsersControllers/clientGetUserPreviewData')
const clientGetMultipleUserDataById = require('./clientUsersControllers/clientGetMultipleUserDataById')
const clientFollowUser = require('./clientUsersControllers/clientFollowUser')
const clientUnFollowUser = require('./clientUsersControllers/clientUnFollowUser')
const clientGetUserData = require('./clientUsersControllers/clientGetUserData')
const clientGetUserInfo = require('./clientUsersControllers/clientGetUserInfo')
const clientGetUsersList = require('./clientUsersControllers/clientGetUsersList')

router.post('/register',clientRegisterNewUser)
router.post('/login',clientUserLogin)
router.post('/resetPassword',authMiddleware,clientResetUserPassword)
router.post('/getUserInfo',authMiddleware,clientGetUserInfo)
router.post('/getUserData',authMiddleware,clientGetUserData)
router.post('/updateUserData',authMiddleware,clientUpdateUserData)
router.post('/getUserPreviewData',clientGetUserPreviewData)
router.post('/getMultipleUserDataById',clientGetMultipleUserDataById)
router.post('/followUser',authMiddleware,clientFollowUser)
router.post('/unFollowUser',authMiddleware,clientUnFollowUser)
router.post('/getUsersList',clientGetUsersList)

//clientUsersController.clientUpdateUserData = (req,res) => {clientUpdateUserData(req,res)}
//clientUsersController.clientRegisterNewUser = (req,res) => {clientRegisterNewUser(req,res)}
//clientUsersController.clientUserLogin = (req,res) => {clientUserLogin(req,res)}
//clientUsersController.clientResetUserPassword = (req,res) => {clientResetUserPassword(req,res)}
//clientUsersController.clientGetUserPreviewData = (req,res) => {clientGetUserPreviewData(req,res)}
//clientUsersController.clientGetMultipleUserDataById = (req,res) => {clientGetMultipleUserDataById(req,res)}
// clientUsersController.clientFollowUser = (req,res) => {clientFollowUser(req,res)}
// clientUsersController.clientUnFollowUser = (req,res) => {clientUnFollowUser(req,res)}
//clientUsersController.clientGetUserData = (req,res) => {clientGetUserData(req,res)}
//clientUsersController.clientGetUserInfo = (req,res) => {clientGetUserInfo(req,res)}

module.exports = router