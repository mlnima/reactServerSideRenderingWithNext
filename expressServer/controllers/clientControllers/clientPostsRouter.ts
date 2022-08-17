//clientPostsRouter
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const cacheSuccesses = require('../../middlewares/apiCache');

import clientGetPosts from './clientPostsControllers/clientGetPosts'
import clientGetPost from './clientPostsControllers/clientGetPost'
import clientLikeDislikeView from './clientPostsControllers/clientLikeDislikeView'
import clientNewComment from './clientPostsControllers/clientNewComment'
import clientCheckRemovedContent from './clientPostsControllers/clientCheckRemovedContent'
import clientGetMetas from './clientPostsControllers/clientGetMetas'
import clientGetMeta from './clientPostsControllers/clientGetMeta'
import clientGetComments from './clientPostsControllers/clientGetComments'
import clientUserCreateNewPost from './clientPostsControllers/clientUserCreateNewPost'
import clientUserUpdatePost from './clientPostsControllers/clientUserUpdatePost'
import clientFixMetaImage from './clientPostsControllers/clientFixMetaImage'
import ClientMetaSuggestion from './clientPostsControllers/ClientMetaSuggestion'


// const clientGetPosts = require('./clientPostsControllers/clientGetPosts')
// const clientGetPost = require('./clientPostsControllers/clientGetPost')
// const clientLikeDislikeView = require('./clientPostsControllers/clientLikeDislikeView')
// const clientNewComment = require('./clientPostsControllers/clientNewComment')
// const clientCheckRemovedContent = require('./clientPostsControllers/clientCheckRemovedContent')
// const clientGetMetas = require('./clientPostsControllers/clientGetMetas')
// const clientGetMeta = require('./clientPostsControllers/clientGetMeta')
// const clientGetComments = require('./clientPostsControllers/clientGetComments')
// const clientUserCreateNewPost = require('./clientPostsControllers/clientUserCreateNewPost')
// const clientUserUpdatePost = require('./clientPostsControllers/clientUserUpdatePost')
// const clientFixMetaImage = require('./clientPostsControllers/clientFixMetaImage')
// const ClientMetaSuggestion = require('./clientPostsControllers/ClientMetaSuggestion')


router.get('/clientGetPosts',cacheSuccesses,clientGetPosts)
router.get('/clientGetPost',cacheSuccesses,clientGetPost)
router.get('/clientGetEditingPost',clientGetPost)
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