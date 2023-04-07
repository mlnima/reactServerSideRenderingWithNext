import {Router} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import authWithUserDataMiddleware from "../../middlewares/authWithUserDataMiddleware";
import cacheSuccesses from '../../middlewares/apiCache';

import getPosts from './postsControllers/getPosts'
import getPost from './postsControllers/getPost'
import likeDislikeView from './postsControllers/likeDislikeView'
import newComment from './postsControllers/newComment'
import checkRemovedContent from './postsControllers/checkRemovedContent'
import getMetas from './postsControllers/getMetas'
import getMeta from './postsControllers/getMeta'
import getComments from './postsControllers/getComments'
import newPost from './postsControllers/newPost'
import resetMetaImage from './postsControllers/resetMetaImage'
import MetaSuggestion from './postsControllers/metaSuggestion'
import attendToEvent from './postsControllers/attendToEvent'
import tags from './postsControllers/tags'
import updatePost from './postsControllers/updatePost'

const router = Router();

router.get('/getPosts',cacheSuccesses,getPosts)
router.get('/getPost',cacheSuccesses,getPost)
router.get('/getEditingPost',getPost)
router.post('/likeDislikeView',likeDislikeView)
router.post('/newComment',newComment)
router.post('/checkRemovedContent',checkRemovedContent)
router.post('/resetMetaImage',resetMetaImage)
router.get('/getMetas',cacheSuccesses,getMetas)
router.get('/getMeta',cacheSuccesses,getMeta)
router.get('/tags',cacheSuccesses,tags)
router.get('/getComments',getComments)
router.post('/newPost',authMiddleware,newPost)
router.get('/metaSuggestion',MetaSuggestion)
router.post('/attendToEvent',attendToEvent)
router.post('/updatePost',authWithUserDataMiddleware,updatePost)
export default router