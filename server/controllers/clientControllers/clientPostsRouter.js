//clientPostsRouter
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const cacheSuccesses = require('../../middlewares/apiCache');

const clientGetPosts = require('./clientPostsControllers/clientGetPosts')
const clientGetPost = require('./clientPostsControllers/clientGetPost')
const clientLikeDislikeView = require('./clientPostsControllers/clientLikeDislikeView')
const clientNewComment = require('./clientPostsControllers/clientNewComment')
const clientCheckRemovedContent = require('./clientPostsControllers/clientCheckRemovedContent')
const clientGetMultipleMeta = require('./clientPostsControllers/clientGetMultipleMeta')
const clientGetSingleMeta = require('./clientPostsControllers/clientGetSingleMeta')
const clientGetComments = require('./clientPostsControllers/clientGetComments')
const clientUserCreateNewPost = require('./clientPostsControllers/clientUserCreateNewPost')
const clientFixMetaImage = require('./clientPostsControllers/clientFixMetaImage')

router.post('/clientGetPosts',cacheSuccesses,clientGetPosts)
router.post('/clientGetPost',cacheSuccesses,clientGetPost)
router.post('/likeDislikeView',clientLikeDislikeView)
router.post('/newComment',clientNewComment)
router.post('/checkRemovedContent',clientCheckRemovedContent)
router.post('/fixMetaImage',clientFixMetaImage)
router.post('/getMultipleMeta',cacheSuccesses,clientGetMultipleMeta)
router.get('/getSingleMeta',cacheSuccesses,clientGetSingleMeta)
router.post('/getComments',clientGetComments)
router.post('/userCreateNewPost',authMiddleware,clientUserCreateNewPost)

module.exports = router