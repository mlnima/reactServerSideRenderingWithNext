import express, {Router} from 'express';

import ChatroomController from "../controllers/ChatroomController";
import FileManagerController from "../controllers/FileManagerController";
import FormController from "../controllers/FormController";
import MessengerController from "../controllers/MessengerController";
import OrderController from "../controllers/OrderController";
import PageController from "../controllers/PageController";
import PostController from "../controllers/PostController";
import SettingController from "../controllers/SettingController";
import UserController from "../controllers/UserController";
import WidgetController from "../controllers/WidgetController";
import BackupController from "../controllers/BackupController";
import ScrapperController from "../controllers/ScrapperController";
import SitemapController from "../controllers/SitemapController";

import authMiddleware from "@util/middlewares/authMiddleware";
import adminAuthMiddleware from "@util/middlewares/adminAuthMiddleware";
import adminApiRequestMiddleware from "../middlewares/apiRequestMiddleware";
import authWithUserDataMiddleware from "@util/middlewares/authWithUserDataMiddleware";
import rateLimitMiddleware from "../middlewares/rateLimitMiddleware";

import cacheSuccesses from "../middlewares/apiCache";

const router = Router();

//---------------------chatrooms----------------------
// router.get('/v1/chatrooms/loadOlderMessages',authMiddleware,ChatroomController.loadOlderMessages);
// router.get('/v1/chatrooms/getConversationsList',authMiddleware,ChatroomController.getConversationsList);
// router.get('/v1/chatrooms/getAConversation',authMiddleware,ChatroomController.getAConversation);
// router.post('/v1/chatrooms/startAConversation',authMiddleware,ChatroomController.startAConversation);

router.get('/v1/chatrooms/getChatroom',ChatroomController.getChatroom)

//---------------------fileManager--------------------
router.post('/v1/fileManager/userProfileImageUpload', authMiddleware, FileManagerController.userProfileImageUpload)
router.post('/v1/fileManager/uploadImage', authMiddleware, FileManagerController.uploadImage)
router.post('/v1/fileManager/uploadPostImages', authMiddleware, FileManagerController.uploadPostImages)
router.post('/v1/fileManager/uploadProfileImage', authMiddleware, FileManagerController.uploadProfileImage)
router.post('/v1/fileManager/deletePostImage', authMiddleware, FileManagerController.deletePostImage)
router.post('/v1/fileManager/deletePostImages', authMiddleware, FileManagerController.deletePostImages)
//---------------------forms--------------------------
router.post('/v1/forms/saveFormData', FormController.saveFormData);
//---------------------messenger----------------------
router.get('/v1/messenger/loadOlderMessages',authMiddleware,MessengerController.loadOlderMessages);
router.get('/v1/messenger/getConversationsList',authMiddleware,MessengerController.getConversationsList);
router.get('/v1/messenger/getAConversation',authMiddleware,MessengerController.getAConversation);
router.post('/v1/messenger/startAConversation',authMiddleware,MessengerController.startAConversation);
//---------------------order----------------------
router.post('/v1/orders/create/payPal', authMiddleware, OrderController.clientCreateOrder)
//---------------------pages----------------------
router.get('/v1/getPage', PageController.getPage)
router.get('/v1/getPagesData', PageController.clientGetPagesData)
//---------------------posts----------------------
router.get('/v1/posts/getPosts',cacheSuccesses,PostController.getPosts)
router.get('/v1/posts/getUserPagePosts',cacheSuccesses,PostController.getUserPagePosts)
router.get('/v1/posts/getSearch',cacheSuccesses,PostController.getSearch)
router.get('/v1/posts/getPost',cacheSuccesses,PostController.getPost)
router.get('/v1/posts/getPostViews',PostController.getPostViews)
router.get('/v1/posts/getPostRating',PostController.getPostRating)
router.get('/v1/posts/getEditingPost',PostController.getEditingPost)
router.delete('/v1/posts/deletePostByAuthor',authWithUserDataMiddleware,PostController.deletePostByAuthor)
router.post('/v1/posts/likeDislikeView',PostController.likeDislikeView)
router.patch('/v1/posts/likeDislikePost',rateLimitMiddleware(3,60*1000),authMiddleware,PostController.likeDislikePost)
router.post('/v1/posts/newComment',rateLimitMiddleware(1,60*1000),PostController.newComment)
router.post('/v1/posts/resetMetaImage',PostController.resetMetaImage)
router.get('/v1/posts/getMetas',cacheSuccesses,PostController.getMetas)
router.get('/v1/posts/getMeta',cacheSuccesses,PostController.getMeta)
router.get('/v1/posts/tags',cacheSuccesses,PostController.getTags)
router.get('/v1/posts/getComments',PostController.getComments)
router.post('/v1/posts/newPost',authMiddleware,PostController.newPost)
router.get('/v1/posts/metaSuggestion',PostController.MetaSuggestion)
router.post('/v1/posts/updatePost',authWithUserDataMiddleware,PostController.updatePost)
//---------------------settings-------------------
router.get('/v1/settings/getSettings', cacheSuccesses, SettingController.getSettings)
//---------------------users----------------------
router.post('/v1/users/register', UserController.register);
router.post('/v1/users/login', UserController.login);
router.post('/v1/users/getSignedInUserData', authMiddleware, UserController.getSignedInUserData);
router.post('/v1/users/resetPassword', authMiddleware, UserController.resetPassword);
router.post('/v1/users/updateUserData', authMiddleware, UserController.updateUserData);
router.get('/v1/users/getUser', authMiddleware, UserController.getUser);
router.get('/v1/users/getUserPageInitialData', authMiddleware, UserController.getUserPageInitialData);
router.get('/v1/users/getUsers', UserController.getUsers);
router.get('/v1/users/getUserPageData', UserController.getUserPageData);
router.patch('/v1/users/followUser', authMiddleware, UserController.followUser);
router.patch('/v1/users/unFollowUser', authMiddleware, UserController.unfollowUser);
router.post('/v1/users/getStartConversation', authMiddleware, UserController.getStartConversation);
//---------------------widgets----------------------------
router.get('/v1/widgets/getWidgets', cacheSuccesses, WidgetController.getWidgets)

//---------------------###Dashboard###--------------------

//---------------------backups----------------------------
router.post('/admin/backups/metas', adminAuthMiddleware, BackupController.metas);
//---------------------Chatroom----------------------------
router.get('/admin/chatrooms/getChatrooms',adminAuthMiddleware,ChatroomController.dashboardGetChatrooms);
router.get('/admin/chatrooms/getChatroom',adminAuthMiddleware,ChatroomController.dashboardGetChatroom);
router.post('/admin/chatrooms/createChatroom',adminAuthMiddleware,ChatroomController.dashboardCreateChatroom);
router.delete('/admin/chatrooms/deleteChatroom',adminAuthMiddleware,ChatroomController.dashboardDeleteChatroom);
router.patch('/admin/chatrooms/updateChatroom',adminAuthMiddleware,ChatroomController.dashboardUpdateChatroom);
router.delete('/admin/chatrooms/deleteChatroomMessage',adminAuthMiddleware,ChatroomController.dashboardDeleteChatroomMessage);
//---------------------FileManager----------------------------
router.post('/admin/fileManager/readPath', adminAuthMiddleware, FileManagerController.dashboardReadPath);
router.post('/admin/fileManager/readFile', adminAuthMiddleware, FileManagerController.dashboardReadFile);
router.post('/admin/fileManager/deleteFile', adminAuthMiddleware, FileManagerController.dashboardDeleteFile);
router.post('/admin/fileManager/uploadFile', adminAuthMiddleware, FileManagerController.dashboardUploadFile);
router.post('/admin/fileManager/uploadFiles', adminAuthMiddleware, FileManagerController.dashboardUploadFiles);
router.post('/admin/fileManager/postThumbnailsUpload', adminAuthMiddleware, FileManagerController.dashboardPostThumbnailsUpload);
router.post('/admin/fileManager/create', adminAuthMiddleware, FileManagerController.dashboardCreateNewFileOrFolder);
router.post('/admin/fileManager/updateTranslationsFile', adminAuthMiddleware, FileManagerController.dashboardUpdateTranslationsFile);
router.post('/admin/fileManager/readTranslationsFile', adminAuthMiddleware, FileManagerController.dashboardReadTranslationsFile);
//---------------------Form----------------------------
router.get('/admin/forms/getForms', adminAuthMiddleware, FormController.dashboardGetForms);
router.get('/admin/forms/getForm', adminAuthMiddleware, FormController.dashboardGetFrom);
router.delete('/admin/forms/deleteForm', adminAuthMiddleware, FormController.dashboardDeleteForm);
//---------------------Order----------------------------
router.post('/admin/orders/getOrders',adminAuthMiddleware,OrderController.dashboardGetOrders);
//---------------------Page----------------------------
router.post('/admin/pages/createNewPage', adminAuthMiddleware, PageController.dashboardCreateNewPage);
router.post('/admin/pages/updatePage', adminAuthMiddleware, PageController.dashboardUpdatePage);
router.post('/admin/pages/getPagesData', adminAuthMiddleware, PageController.dashboardGetPagesData);
router.post('/admin/pages/deleteCustomPage', adminAuthMiddleware, PageController.dashboardDeleteCustomPage);
router.post('/admin/pages/getPageData', adminAuthMiddleware, PageController.dashboardGetPageData);
//---------------------Post----------------------------
router.post('/admin/posts/createNewPost',adminAuthMiddleware,PostController.dashboardCreateNewPost)
router.post('/admin/posts/postDataScrappers',adminAuthMiddleware,PostController.dashboardPostDataScrappers)
router.get('/admin/posts/findAnotherSimilarSourceLink',adminAuthMiddleware,PostController.dashboardFindAnotherSimilarSourceLink)
// router.post('/adminImportPosts',adminAuthMiddleware,adminImportPosts)
router.post('/admin/posts/updatePost',adminAuthMiddleware,PostController.dashboardUpdatePost)
router.post('/admin/posts/deletePost',adminAuthMiddleware,PostController.dashboardDeletePost)
router.post('/admin/posts/postsBulkAction',adminAuthMiddleware,PostController.dashboardPostsBulkAction)
router.post('/admin/posts/bulkAction',adminAuthMiddleware,PostController.dashboardBulkAction)
router.post('/admin/posts/exportPosts',adminAuthMiddleware,PostController.dashboardExportPosts)
router.post('/admin/posts/updateMeta',adminAuthMiddleware,PostController.dashboardUpdateMeta)
router.post('/admin/posts/syncDuplicateMetas',adminAuthMiddleware,PostController.dashboardSyncDuplicateMetas)
router.post('/admin/posts/deleteMeta',adminAuthMiddleware,PostController.dashboardDeleteMeta)
router.post('/admin/posts/updateComment',adminAuthMiddleware,PostController.dashboardUpdateComment)
router.post('/admin/posts/deleteComments',adminAuthMiddleware,PostController.dashboardDeleteComments)
router.get('/admin/posts/getComments',adminAuthMiddleware,PostController.dashboardGetComments)
router.get('/admin/posts/getPost',adminAuthMiddleware,PostController.dashboardGetPost)
router.get('/admin/posts/getPosts',adminAuthMiddleware,PostController.dashboardGetPosts)
router.get('/admin/posts/getMeta',adminAuthMiddleware,PostController.dashboardGetMeta)
router.get('/admin/posts/getMetas',adminAuthMiddleware,PostController.dashboardGetMetas)
router.get('/admin/posts/checkAndRemoveDeletedVideos',adminAuthMiddleware,PostController.dashboardCheckAndRemoveDeletedVideos)
router.get('/admin/posts/setMetaThumbnailsAndCount',adminAuthMiddleware,PostController.dashboardSetMetaThumbnailsAndCount)
router.get('/admin/posts/generatePermaLinkForPosts',adminAuthMiddleware,PostController.dashboardGeneratePermaLinkForPosts)
//---------------------Post API----------------------------
router.post('/admin/posts/createNewByApi',express.json({limit:'50MB'}),adminApiRequestMiddleware,PostController.dashboardCreateNewPostByApi)
router.post('/admin/posts/updatePostByApi',adminApiRequestMiddleware,PostController.dashboardUpdatePostByApi)
router.post('/admin/posts/updateMetaByApi',adminApiRequestMiddleware,PostController.dashboardUpdateMetaByApi)

//---------------------scrapper----------------------------
router.post('/admin/scrapper/scrapYoutubeInfo', adminAuthMiddleware, ScrapperController.youtube)
//---------------------Setting----------------------------
router.post('/admin/settings/update',adminAuthMiddleware,SettingController.dashboardUpdateSettings)
router.get('/admin/settings/getSetting',adminAuthMiddleware,SettingController.dashboardGetSettings)
router.get('/admin/settings/getMultipleSetting',adminAuthMiddleware,SettingController.dashboardGetMultipleSettings)
//---------------------Sitemap----------------------------
router.post('/admin/sitemapsAndStaticAsset/generateSitemapsAndStaticAsset',adminAuthMiddleware,SitemapController.generateSitemapsAndStaticAssets);
//---------------------User----------------------------
router.post('/admin/users/newAPIKey', adminAuthMiddleware, UserController.dashboardNewApiKey);
router.get('/admin/users/getUsers', adminAuthMiddleware, UserController.dashboardGetUsers);
router.delete('/admin/users/deleteUser', adminAuthMiddleware, UserController.dashboardDeleteUser);
router.get('/admin/users/getUser', adminAuthMiddleware, UserController.dashboardGetUser);
router.post('/admin/users/updateUser', adminAuthMiddleware, UserController.dashboardUpdateUser);
//---------------------Widget----------------------------
router.post('/admin/widgets/createWidget',adminAuthMiddleware,WidgetController.dashboardCreateWidget)
router.post('/admin/widgets/updateWidget',adminAuthMiddleware,WidgetController.dashboardUpdateWidget)
router.post('/admin/widgets/adminDeleteWidget',adminAuthMiddleware,WidgetController.dashboardDeleteWidget)
router.get('/admin/widgets/getWidgets',adminAuthMiddleware,WidgetController.dashboardGetWidgets)
router.get('/admin/widgets/getPopulatedWidgets',adminAuthMiddleware,WidgetController.getPopulatedWidgets)

export default router