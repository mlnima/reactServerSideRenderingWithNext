import express from 'express';
//middlewares
import {adminAuthMiddleware} from 'custom-server-util';
import adminApiRequestMiddleware from '../../middlewares/apiRequestMiddleware';
//API Controllers
import adminCreateNewPostByApi from './adminPostsControllers/adminCreateNewPostByApi';
import adminUpdatePostByApi from './adminPostsControllers/adminUpdatePostByApi';
//------
import adminCreateNewPost from './adminPostsControllers/adminCreateNewPost';
import adminUpdatePost from './adminPostsControllers/adminUpdatePost';
import adminDeletePost from './adminPostsControllers/adminDeletePost';
import adminPostsBulkAction from './adminPostsControllers/adminPostsBulkAction';
import adminBulkAction from './adminPostsControllers/adminBulkAction';
import adminExportPosts from './adminPostsControllers/adminExportPosts';
import adminUpdateMeta from './adminPostsControllers/adminUpdateMeta';
import adminDeleteMeta from './adminPostsControllers/adminDeleteMeta';
import adminUpdateComment from './adminPostsControllers/adminUpdateComment';
import adminDeleteComments from './adminPostsControllers/adminDeleteComments';
import adminGetComments from './adminPostsControllers/adminGetComments';
import adminGetMeta from './adminPostsControllers/adminGetMeta';
import adminGetMetas from './adminPostsControllers/adminGetMetas';
import adminCheckAndRemoveDeletedVideos from './adminPostsControllers/adminCheckAndRemoveDeletedVideos';
import adminSetMetaThumbnailsAndCount from './adminPostsControllers/adminSetMetaThumbnailsAndCount';
// import adminImportPosts from './adminPostsControllers/adminImportPosts';
import adminUpdateMetaByApi from './adminPostsControllers/adminUpdateMetaByApi';
import adminGetPost from './adminPostsControllers/adminGetPost';
import adminGetPosts from './adminPostsControllers/adminGetPosts';
import adminGeneratePermaLinkForPosts from './adminPostsControllers/adminGeneratePermaLinkForPosts';
import postDataScrappers from "./adminPostsControllers/postDataScrappers/postDataScrappers";
import syncDuplicateMetas from "./adminPostsControllers/syncDuplicateMetas";

const router = express.Router();

router.post('/createNewPost',adminAuthMiddleware,adminCreateNewPost)
router.post('/postDataScrappers',adminAuthMiddleware,postDataScrappers)
// router.post('/adminImportPosts',adminAuthMiddleware,adminImportPosts)
router.post('/updatePost',adminAuthMiddleware,adminUpdatePost)
router.post('/deletePost',adminAuthMiddleware,adminDeletePost)
router.post('/postsBulkAction',adminAuthMiddleware,adminPostsBulkAction)
router.post('/bulkAction',adminAuthMiddleware,adminBulkAction)
router.post('/exportPosts',adminAuthMiddleware,adminExportPosts)
router.post('/updateMeta',adminAuthMiddleware,adminUpdateMeta)
router.post('/syncDuplicateMetas',adminAuthMiddleware,syncDuplicateMetas)
router.post('/deleteMeta',adminAuthMiddleware,adminDeleteMeta)
router.post('/updateComment',adminAuthMiddleware,adminUpdateComment)
router.post('/deleteComments',adminAuthMiddleware,adminDeleteComments)
router.get('/getComments',adminAuthMiddleware,adminGetComments)
router.get('/getPost',adminAuthMiddleware,adminGetPost)
router.get('/getPosts',adminAuthMiddleware,adminGetPosts)
router.get('/getMeta',adminAuthMiddleware,adminGetMeta)
router.get('/getMetas',adminAuthMiddleware,adminGetMetas)
router.get('/checkAndRemoveDeletedVideos',adminAuthMiddleware,adminCheckAndRemoveDeletedVideos)
router.get('/setMetaThumbnailsAndCount',adminAuthMiddleware,adminSetMetaThumbnailsAndCount)
router.get('/generatePermaLinkForPosts',adminAuthMiddleware,adminGeneratePermaLinkForPosts)
//API routes
router.post('/createNewByApi',express.json({limit:'50MB'}),adminApiRequestMiddleware,adminCreateNewPostByApi)
router.post('/updatePostByApi',adminApiRequestMiddleware,adminUpdatePostByApi)
router.post('/updateMetaByApi',adminApiRequestMiddleware,adminUpdateMetaByApi)
//------
export default router