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
import clientFixMetaImage from './clientPostsControllers/clientFixMetaImage'
import ClientMetaSuggestion from './clientPostsControllers/ClientMetaSuggestion'

const router = Router();

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

export default router