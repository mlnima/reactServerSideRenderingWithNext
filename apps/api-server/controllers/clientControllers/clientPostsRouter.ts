import {Router} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import cacheSuccesses from '../../middlewares/apiCache';
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
import resetMetaImage from './clientPostsControllers/resetMetaImage'
import ClientMetaSuggestion from './clientPostsControllers/ClientMetaSuggestion'
import attendToEvent from './clientPostsControllers/attendToEvent'
import tags from './clientPostsControllers/tags'

const router = Router();

router.get('/clientGetPosts',cacheSuccesses,clientGetPosts)
router.get('/clientGetPost',cacheSuccesses,clientGetPost)
router.get('/clientGetEditingPost',clientGetPost)
router.post('/likeDislikeView',clientLikeDislikeView)
router.post('/newComment',clientNewComment)
router.post('/checkRemovedContent',clientCheckRemovedContent)
router.post('/resetMetaImage',resetMetaImage)
router.get('/getMetas',cacheSuccesses,clientGetMetas)
router.get('/getMeta',cacheSuccesses,clientGetMeta)
router.get('/tags',cacheSuccesses,tags)
router.get('/getComments',clientGetComments)
router.post('/userCreateNewPost',authMiddleware,clientUserCreateNewPost)
router.post('/userUpdatePost',authMiddleware,clientUserUpdatePost)
router.get('/metaSuggestion',ClientMetaSuggestion)
router.post('/attendToEvent',attendToEvent)

export default router