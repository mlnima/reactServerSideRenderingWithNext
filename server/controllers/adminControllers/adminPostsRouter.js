
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminCreateNewPost = require('./adminPostsControllers/adminCreateNewPost')
const adminUpdatePost = require('./adminPostsControllers/adminUpdatePost')
const adminDeletePost = require('./adminPostsControllers/adminDeletePost')
const adminPostsBulkAction = require('./adminPostsControllers/adminPostsBulkAction')
const adminBulkAction = require('./adminPostsControllers/adminBulkAction')
const adminExportPosts = require('./adminPostsControllers/adminExportPosts')
const adminUpdateMeta = require('./adminPostsControllers/adminUpdateMeta')
const adminDeleteMeta = require('./adminPostsControllers/adminDeleteMeta')
const adminUpdateComment = require('./adminPostsControllers/adminUpdateComment')
const adminDeleteComments = require('./adminPostsControllers/adminDeleteComments')
const adminCreateNewPostByApi = require('./adminPostsControllers/adminCreateNewPostByApi')
const adminGetComments = require('./adminPostsControllers/adminGetComments')


router.post('/createNewPost',adminAuthMiddleware,adminCreateNewPost)
router.post('/updatePost',adminAuthMiddleware,adminUpdatePost)
router.post('/deletePost',adminAuthMiddleware,adminDeletePost)
router.post('/postsBulkAction',adminAuthMiddleware,adminPostsBulkAction)
router.post('/bulkAction',adminAuthMiddleware,adminBulkAction)
router.post('/exportPosts',adminAuthMiddleware,adminExportPosts)
router.post('/updateMeta',adminAuthMiddleware,adminUpdateMeta)
router.post('/deleteMeta',adminAuthMiddleware,adminDeleteMeta)
router.post('/updateComment',adminAuthMiddleware,adminUpdateComment)
router.post('/deleteComments',adminAuthMiddleware,adminDeleteComments)
router.post('/createNewByApi',adminAuthMiddleware,adminCreateNewPostByApi)
router.post('/getComments',adminAuthMiddleware,adminGetComments)




module.exports = router