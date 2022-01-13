const express = require('express');
const router = express.Router();

//middlewares
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const adminApiRequestMiddleware = require('../../middlewares/apiRequestMiddleware')
//API Controllers
const adminCreateNewPostByApi = require('./adminPostsControllers/adminCreateNewPostByApi')
const adminUpdatePostByApi = require('./adminPostsControllers/adminUpdatePostByApi')
//------
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
const adminGetComments = require('./adminPostsControllers/adminGetComments')
const adminGetMeta = require('./adminPostsControllers/adminGetMeta')
const adminGetMetas = require('./adminPostsControllers/adminGetMetas')
const adminCheckAndRemoveDeletedVideos = require('./adminPostsControllers/adminCheckAndRemoveDeletedVideos')
const adminSetMetaThumbnailsAndCount = require('./adminPostsControllers/adminSetMetaThumbnailsAndCount')
const adminImportPosts = require('./adminPostsControllers/adminImportPosts')
const adminUpdateMetaByApi = require('./adminPostsControllers/adminUpdateMetaByApi')
const adminGetPost = require('./adminPostsControllers/adminGetPost')
const adminGetPosts= require('./adminPostsControllers/adminGetPosts')

router.post('/createNewPost',adminAuthMiddleware,adminCreateNewPost)
router.post('/adminImportPosts',adminAuthMiddleware,adminImportPosts)
router.post('/updatePost',adminAuthMiddleware,adminUpdatePost)
router.post('/deletePost',adminAuthMiddleware,adminDeletePost)
router.post('/postsBulkAction',adminAuthMiddleware,adminPostsBulkAction)
router.post('/bulkAction',adminAuthMiddleware,adminBulkAction)
router.post('/exportPosts',adminAuthMiddleware,adminExportPosts)
router.post('/updateMeta',adminAuthMiddleware,adminUpdateMeta)
router.post('/deleteMeta',adminAuthMiddleware,adminDeleteMeta)
router.post('/updateComment',adminAuthMiddleware,adminUpdateComment)
router.post('/deleteComments',adminAuthMiddleware,adminDeleteComments)
router.post('/getComments',adminAuthMiddleware,adminGetComments)
router.get('/getPost',adminAuthMiddleware,adminGetPost)
router.get('/getPosts',adminAuthMiddleware,adminGetPosts)
router.get('/getMeta',adminAuthMiddleware,adminGetMeta)
router.get('/getMetas',adminAuthMiddleware,adminGetMetas)
router.get('/checkAndRemoveDeletedVideos',adminAuthMiddleware,adminCheckAndRemoveDeletedVideos)
router.get('/setMetaThumbnailsAndCount',adminAuthMiddleware,adminSetMetaThumbnailsAndCount)
//API routes
router.post('/createNewByApi',express.json({limit:'50MB'}),adminApiRequestMiddleware,adminCreateNewPostByApi)
router.post('/updatePostByApi',adminApiRequestMiddleware,adminUpdatePostByApi)
router.post('/updateMetaByApi',adminApiRequestMiddleware,adminUpdateMetaByApi)
//------
module.exports = router