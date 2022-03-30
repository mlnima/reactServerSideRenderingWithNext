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
const clientGetMetas = require('./clientPostsControllers/clientGetMetas')
const clientGetMeta = require('./clientPostsControllers/clientGetMeta')
const clientGetComments = require('./clientPostsControllers/clientGetComments')
const clientUserCreateNewPost = require('./clientPostsControllers/clientUserCreateNewPost')
const clientUserUpdatePost = require('./clientPostsControllers/clientUserUpdatePost')
const clientFixMetaImage = require('./clientPostsControllers/clientFixMetaImage')
const ClientMetaSuggestion = require('./clientPostsControllers/ClientMetaSuggestion')


router.get('/clientGetPosts',cacheSuccesses,clientGetPosts)
router.get('/clientGetPost',cacheSuccesses,clientGetPost)
router.post('/likeDislikeView',clientLikeDislikeView)
router.post('/newComment',clientNewComment)
router.post('/checkRemovedContent',clientCheckRemovedContent)
router.post('/fixMetaImage',clientFixMetaImage)
router.get('/getMetas',cacheSuccesses,clientGetMetas)
router.get('/getMeta',cacheSuccesses,clientGetMeta)
router.get('/getComments',clientGetComments)
router.post('/userCreateNewPost',authMiddleware,clientUserCreateNewPost)
router.post('/userUpdatePost',authMiddleware,clientUserUpdatePost)
router.get('/metaSuggestion',ClientMetaSuggestion)

module.exports = router