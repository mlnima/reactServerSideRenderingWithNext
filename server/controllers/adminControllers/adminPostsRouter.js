const express = require('express');
const router = express.Router();
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
const adminGetPost = require('./adminPostsControllers/adminGetPost')
const adminGetMeta = require('./adminPostsControllers/adminGetMeta')
const adminCheckAndRemoveDeletedVideos = require('./adminPostsControllers/adminCheckAndRemoveDeletedVideos')
const adminSetMetaThumbnailsAndCount = require('./adminPostsControllers/adminSetMetaThumbnailsAndCount')


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
router.post('/createNewByApi',adminCreateNewPostByApi)
router.post('/getComments',adminAuthMiddleware,adminGetComments)
router.get('/getPost',adminAuthMiddleware,adminGetPost)
router.get('/getMeta',adminAuthMiddleware,adminGetMeta)
router.post('/checkAndRemoveDeletedVideos',adminAuthMiddleware,adminCheckAndRemoveDeletedVideos)
router.get('/setMetaThumbnailsAndCount',adminAuthMiddleware,adminSetMetaThumbnailsAndCount)

module.exports = router