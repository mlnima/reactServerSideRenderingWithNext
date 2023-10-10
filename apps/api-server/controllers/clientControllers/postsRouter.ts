import {Router} from 'express';
import {authMiddleware} from "custom-server-util";
import authWithUserDataMiddleware from "../../middlewares/authWithUserDataMiddleware";
import cacheSuccesses from '../../middlewares/apiCache';

import {getPosts, getUserPagePosts} from './postsControllers/getPosts'
import getPost from './postsControllers/getPost'
import likeDislikeView from './postsControllers/likeDislikeView'
import newComment from './postsControllers/newComment'
// import checkRemovedContent from './postsControllers/checkRemovedContent'
import getMetas from './postsControllers/getMetas'
import getMeta from './postsControllers/getMeta'
import getComments from './postsControllers/getComments'
import newPost from './postsControllers/newPost'
import resetMetaImage from './postsControllers/resetMetaImage'
import MetaSuggestion from './postsControllers/metaSuggestion'
import attendToEvent from './postsControllers/attendToEvent'
import tags from './postsControllers/tags'
import updatePost from './postsControllers/updatePost'
import getSearch from "./postsControllers/getSearch";
import rateLimitMiddleware from "../../middlewares/rateLimitMiddleware";
import deletePostByAuthor from "./postsControllers/deletePostByAuthor";
import getEditingPost from "./postsControllers/getEditingPost";
import likeDislikePost from "./postsControllers/likeDislikePost";

const router = Router();

router.get('/getPosts',cacheSuccesses,getPosts)
router.get('/getUserPagePosts',cacheSuccesses,getUserPagePosts)
router.get('/getSearch',cacheSuccesses,getSearch)
router.get('/getPost',cacheSuccesses,getPost)
router.get('/getEditingPost',getEditingPost)
router.delete('/deletePostByAuthor',authWithUserDataMiddleware,deletePostByAuthor)
router.post('/likeDislikeView',likeDislikeView)
router.patch('/likeDislikePost',rateLimitMiddleware(3,60*1000),authMiddleware,likeDislikePost)
router.post('/newComment',rateLimitMiddleware(1,60*1000),newComment)
// router.post('/checkRemovedContent',checkRemovedContent)
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