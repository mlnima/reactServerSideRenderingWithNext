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
const clientGetMeta = require('./clientPostsControllers/clientGetMeta')
const clientGetSingleMeta = require('./clientPostsControllers/clientGetSingleMeta')
const clientGetComments = require('./clientPostsControllers/clientGetComments')

router.post('/clientGetPosts',cacheSuccesses,clientGetPosts)
router.post('/clientGetPost',cacheSuccesses,clientGetPost)
router.post('/likeDislikeView',clientLikeDislikeView)
router.post('/newComment',clientNewComment)
router.post('/checkRemovedContent',clientCheckRemovedContent)
router.post('/getMeta',cacheSuccesses,clientGetMeta)
router.post('/getSingleMeta',cacheSuccesses,clientGetSingleMeta)
router.post('/getComments',clientGetComments)

module.exports = router