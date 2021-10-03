//clientUsersRouter
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const clientUpdateUserData = require('./clientUsersControllers/clientUpdateUserData')
const clientRegisterNewUser = require('./clientUsersControllers/clientRegisterNewUser')
const clientUserLogin = require('./clientUsersControllers/clientUserLogin')
const clientResetUserPassword = require('./clientUsersControllers/clientResetUserPassword')
const clientGetUserPreviewData = require('./clientUsersControllers/clientGetUserPreviewData')
const clientGetMultipleUserDataById = require('./clientUsersControllers/clientGetMultipleUserDataById')
const clientFollowUser = require('./clientUsersControllers/clientFollowUser')
const clientUnFollowUser = require('./clientUsersControllers/clientUnFollowUser')
const clientGetUserData = require('./clientUsersControllers/clientGetUserData')
const clientGetSignedInUserData = require('./clientUsersControllers/clientGetSignedInUserData')
const clientGetUsersList = require('./clientUsersControllers/clientGetUsersList')
const clientSendFriendRequest = require('./clientUsersControllers/clientSendFriendRequest')
const clientAcceptFriendRequest = require('./clientUsersControllers/clientAcceptFriendRequest')
const clientUnfriendRequest = require('./clientUsersControllers/clientUnfriendRequest')
const clientCancelFriendRequest = require('./clientUsersControllers/clientCancelFriendRequest')
const clientSendMessage = require('./clientUsersControllers/clientSendMessage')
const clientConversation = require('./clientUsersControllers/clientConversation')
const clientMessageToConversation = require('./clientUsersControllers/clientMessageToConversation')
const clientGetConversations = require('./clientUsersControllers/clientGetConversations')
const clientGetConversation = require('./clientUsersControllers/clientGetConversation')

router.post('/register',clientRegisterNewUser)
router.post('/login',clientUserLogin)
router.post('/resetPassword',authMiddleware,clientResetUserPassword)
router.post('/getSignedInUserData',authMiddleware,clientGetSignedInUserData)
router.post('/getUserData',authMiddleware,clientGetUserData)
router.post('/updateUserData',authMiddleware,clientUpdateUserData)
router.post('/getUserPreviewData',clientGetUserPreviewData)
router.post('/getMultipleUserDataById',clientGetMultipleUserDataById)
router.post('/followUser',authMiddleware,clientFollowUser)
router.post('/unFollowUser',authMiddleware,clientUnFollowUser)
router.post('/getUsersList',clientGetUsersList)
router.post('/sendFriendRequest',authMiddleware,clientSendFriendRequest)
router.post('/acceptFriendRequest',authMiddleware,clientAcceptFriendRequest)
router.post('/unfriendRequest',authMiddleware,clientUnfriendRequest)
router.post('/cancelFriendRequest',authMiddleware,clientCancelFriendRequest)
router.post('/sendMessage',authMiddleware,clientSendMessage)
router.post('/conversation',authMiddleware,clientConversation)
router.post('/getConversations',authMiddleware,clientGetConversations)
router.post('/getConversation',authMiddleware,clientGetConversation)
router.post('/messageToConversation',authMiddleware,clientMessageToConversation)

module.exports = router