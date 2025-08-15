import express, { Router } from 'express';
import ChatroomController from '../controllers/ChatroomController';
import FileManagerController from '../controllers/FileManagerController';
import FormController from '../controllers/FormController';
import MessengerController from '../controllers/MessengerController';
import OrderController from '../controllers/OrderController';
import PageController from '../controllers/PageController';
import PostController from '../controllers/PostController';
import SettingController from '../controllers/SettingController';
import UserController from '../controllers/UserController';
import WidgetController from '../controllers/WidgetController';
import BackupController from '../controllers/BackupController';
import ScrapperController from '../controllers/ScrapperController';
import SitemapController from '../controllers/SitemapController';

import authMiddleware from '@util/middlewares/authMiddleware';
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import adminApiRequestMiddleware from '../middlewares/apiRequestMiddleware';
import authWithUserDataMiddleware from '@util/middlewares/authWithUserDataMiddleware';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware';

import cacheSuccesses from '../middlewares/apiCache';
// import CommentController from '../controllers/CommentController';
import MetaController from '../controllers/MetaController';
import multer from 'multer';
//-------------------NEW imports

const router = Router();
const upload = multer();

//---------------NEW

//---------------------Comments-------------------
// router.delete('/dashboard/comment', adminAuthMiddleware, CommentController.deleteComments);
// router.get('/dashboard/comment', adminAuthMiddleware, CommentController.dashboardGetComments);
// router.post('/v1/comment', rateLimitMiddleware(1, 60 * 1000), CommentController.newComment);
// router.get('/v1/comment', CommentController.getComments);
//---------------------Metas-------------------
router.post('/v1/meta/resetMetaImage', MetaController.resetMetaImage);
router.get('/v1/metas', MetaController.getMetas);
// router.get('/v1/meta', MetaController.getMeta);
router.get('/v1/tags', MetaController.getTags);
router.put('/dashboard/meta', adminAuthMiddleware, MetaController.dashboardUpdateMeta);
router.delete('/dashboard/meta', adminAuthMiddleware, MetaController.dashboardDeleteMeta);
router.get('/dashboard/meta', adminAuthMiddleware, MetaController.dashboardGetMeta);
router.get('/dashboard/metas', adminAuthMiddleware, MetaController.dashboardGetMetas);
router.delete('/dashboard/meta/duplicate', adminAuthMiddleware, MetaController.mergeDuplicateMeta);
router.get('/dashboard/meta/setMetaThumbnailsAndCount', adminAuthMiddleware, MetaController.dashboardSetMetaThumbnailsAndCount);
//---------------------Post----------------------------
router.get('/v1/posts', PostController.getPosts);
router.get('/v1/posts/author', cacheSuccesses, PostController.getUserPagePosts);
router.get('/v1/posts/search', PostController.searchPosts);
router.get('/v1/posts/search/suggest', PostController.searchSuggestions);
router.get('/v1/post', PostController.getPost);
router.get('/v1/post/editing', PostController.getPost);
// router.get('/v1/post/exist', PostController.checkPostExist);
router.get('/v1/post/view', PostController.getPostView);
router.get('/v1/post/rating', PostController.getPostRating);
router.delete('/v1/post', authWithUserDataMiddleware, PostController.deletePost);
router.post('/v1/post/view', PostController.likeDislikeView);
router.patch('/v1/post/likeDislike', rateLimitMiddleware(3, 60 * 1000), authMiddleware, PostController.likeDislike);
router.get('/v1/post/edit/metaSuggestion', PostController.MetaSuggestion);
router.put('/v1/post', authWithUserDataMiddleware, PostController.updatePost);
router.post('/v1/post', authMiddleware, PostController.newPost);
router.patch('/v1/post/checkDeletedVideo', authMiddleware, PostController.checkDeletedVideo);
router.post('/dashboard/post', adminAuthMiddleware, PostController.dashboardCreateNewPost);
router.put('/dashboard/post', adminAuthMiddleware, PostController.dashboardUpdatePost);
router.get('/dashboard/post', adminAuthMiddleware, PostController.dashboardGetPost);
router.get('/dashboard/posts', adminAuthMiddleware, PostController.dashboardGetPosts);
router.patch('/dashboard/posts', adminAuthMiddleware, PostController.dashboardUpdatePosts);
router.post('/dashboard/bulkAction', adminAuthMiddleware, PostController.dashboardBulkAction);
router.post('/dashboard/posts/export', adminAuthMiddleware, PostController.dashboardExportPosts);
router.get('/dashboard/posts/checkAndRemoveDeletedVideos', adminAuthMiddleware, PostController.dashboardCheckAndRemoveDeletedVideos);
router.get('/dashboard/posts/generatePermaLinkForPosts', adminAuthMiddleware, PostController.dashboardGeneratePermaLinkForPosts);

// router.get('/v1/posts/getEditingPost', PostController.getEditingPost);
//---------------------scrapper--------------------------
router.post('/dashboard/scrapper/scrapYoutubeInfo', adminAuthMiddleware, ScrapperController.youtube);
router.post('/dashboard/scrapper/postDataScrappers', adminAuthMiddleware, PostController.dashboardPostDataScrappers);
router.get('/dashboard/scrapper/findAnotherSimilarSourceLink', adminAuthMiddleware, PostController.dashboardFindAnotherSimilarSourceLink);
// router.post('/adminImportPosts',adminAuthMiddleware,adminImportPosts)

//---------------------chatrooms------------------------
router.get('/v1/chatroom', ChatroomController.getChatroom);
router.get('/dashboard/chatrooms', adminAuthMiddleware, ChatroomController.dashboardGetChatrooms);
router.get('/dashboard/chatroom', adminAuthMiddleware, ChatroomController.dashboardGetChatroom);
router.post('/dashboard/chatroom', adminAuthMiddleware, ChatroomController.dashboardCreateChatroom);
router.delete('/dashboard/chatroom', adminAuthMiddleware, ChatroomController.dashboardDeleteChatroom);
router.put('/dashboard/chatroom', adminAuthMiddleware, ChatroomController.dashboardUpdateChatroom);
//We need to access the chatroom messages from admin panel
router.delete('/dashboard/chatroom/message', adminAuthMiddleware, ChatroomController.dashboardDeleteMessage);

//---------------------messenger------------------------
router.get('/v1/messenger/messages', authMiddleware, MessengerController.getMessages);
router.get('/v1/messenger/conversations', authMiddleware, MessengerController.getConversations);
router.get('/v1/messenger/conversation', authMiddleware, MessengerController.getConversation);
router.post('/v1/messenger/conversation', authMiddleware, MessengerController.newConversation);

//---------------------forms-----------------------------
router.post('/v1/form', FormController.saveFormData);
router.get('/dashboard/forms', adminAuthMiddleware, FormController.dashboardGetForms);
router.get('/dashboard/form', adminAuthMiddleware, FormController.dashboardGetFrom);
router.delete('/dashboard/form', adminAuthMiddleware, FormController.dashboardDeleteForm);

//---------------------Setting----------------------------
router.get('/v1/settings', SettingController.getSettings);
router.put('/dashboard/setting', adminAuthMiddleware, SettingController.dashboardUpdateSetting);
router.get('/dashboard/settings', adminAuthMiddleware, SettingController.dashboardGetSettings);

//---------------------User-------------------------------
router.post('/v1/user', UserController.register);
router.get('/v1/user/suggestionList', cacheSuccesses, UserController.suggestionList);
router.get('/v1/user/login', cacheSuccesses, UserController.login);
router.post('/v1/user/getSignedInUserData', authMiddleware, UserController.getSignedInUserData);
router.post('/v1/user/resetPassword', authMiddleware, UserController.resetPassword);
router.put('/v1/user', authMiddleware, UserController.updateUserData);
router.get('/v1/user/initialPageData', authMiddleware, cacheSuccesses, UserController.getInitialPageData);
// router.patch('/v1/user/follow', authMiddleware, UserController.follow);
// router.patch('/v1/user/unfollow', authMiddleware, UserController.unfollow);

router.get('/dashboard/user/newAPIKey', adminAuthMiddleware, UserController.dashboardNewApiKey);
// router.get('/dashboard/users', adminAuthMiddleware, UserController.dashboardGetUsers);
router.get('/dashboard/user', adminAuthMiddleware, UserController.dashboardGetUser);
router.delete('/dashboard/user', adminAuthMiddleware, UserController.dashboardDeleteUser);
//---------------------widgets----------------------------
router.get('/v1/widget', WidgetController.getWidgets);
router.post('/dashboard/widget', adminAuthMiddleware, WidgetController.dashboardCreateWidget);
router.put('/dashboard/widget', adminAuthMiddleware, WidgetController.dashboardUpdateWidget);
router.delete('/dashboard/widget', adminAuthMiddleware, WidgetController.dashboardDeleteWidget);
router.get('/dashboard/widget', adminAuthMiddleware, WidgetController.dashboardGetWidgets);

//---------------------fileManager--------------------
// router.post('/v1/fileManager/userProfileImageUpload', authMiddleware, FileManagerController.userProfileImageUpload);
// router.post('/v1/fileManager/uploadImage', authMiddleware, FileManagerController.uploadImage);
router.post('/v1/file/upload/postImages', authMiddleware, FileManagerController.uploadPostImages);
router.patch('/v1/file/upload/profileImage', authMiddleware, FileManagerController.uploadProfileImage);
// router.delete('/v1/file/delete/postImage', authMiddleware, FileManagerController.deletePostImage);
// router.delete('/v1/file/delete/postImages', authMiddleware, FileManagerController.deletePostImages);
router.post('/dashboard/file/readPath', FileManagerController.dashboardReadPath);
router.post('/dashboard/file/delete/file', FileManagerController.dashboardDeleteFile);
router.post('/dashboard/file/upload/file', FileManagerController.dashboardUploadFile);

//will be change due to not working custom translation after nextjs app router
router.put(
  '/dashboard/file/translationFile',
  express.json({ limit: '100MB' }),
  adminAuthMiddleware,
  FileManagerController.dashboardUpdateTranslationsFile,
);
router.get('/dashboard/file/translationFile', adminAuthMiddleware, FileManagerController.dashboardGetTranslationsFile);
//---------------------Page----------------------------
router.get('/v1/page', PageController.getPage);
router.get('/dashboard/page', adminAuthMiddleware, PageController.dashboardGetPage);
router.post('/dashboard/page', adminAuthMiddleware, PageController.dashboardCreateNewPage);
router.put('/dashboard/page', adminAuthMiddleware, PageController.dashboardUpdatePage);
router.delete('/dashboard/page', adminAuthMiddleware, PageController.dashboardDeletePage);
router.get('/dashboard/pages', adminAuthMiddleware, PageController.dashboardGetPages);

//---------------------backups----------------------------
router.get('/dashboard/backup/metas', adminAuthMiddleware, BackupController.metas);
router.get('/dashboard/backup/posts', adminAuthMiddleware, BackupController.posts);
router.get('/dashboard/backup', adminAuthMiddleware, BackupController.backup);

// //---------------------Order----------------------------
// router.post('/v1/order/payPal', authMiddleware, OrderController.clientCreateOrder);
// router.get('/admin/order', adminAuthMiddleware, OrderController.dashboardGetOrders);

// //---------------------External API----------------------------
// router.post('/external/post', express.json({ limit: '50MB' }), adminApiRequestMiddleware, PostController.apiNewPost);
// router.patch('/external/post', adminApiRequestMiddleware, PostController.apiUpdatePost);
// router.patch('/external/meta', adminApiRequestMiddleware, PostController.apiUpdateMeta);
//
// //---------------------Sitemap----------------------------
// router.get('/dashboard/generateSitemaps', adminAuthMiddleware, SitemapController.generateSitemaps);

export default router;

//router.get('/v1/getPagesData', PageController.clientGetPagesData);
// router.post('/admin/fileManager/create', adminAuthMiddleware, FileManagerController.dashboardCreateNewFileOrFolder);
// router.post('/admin/fileManager/postThumbnailsUpload', adminAuthMiddleware, FileManagerController.dashboardPostThumbnailsUpload);
// router.post('/admin/fileManager/uploadFiles', adminAuthMiddleware, FileManagerController.dashboardUploadFiles);
// router.post('/admin/fileManager/readFile', adminAuthMiddleware, FileManagerController.dashboardReadFile);
// router.get('/admin/settings/getSetting', adminAuthMiddleware, SettingController.dashboardGetSettings);
// router.get('/v1/member', authMiddleware, UserController.getUser);
// router.get('/v1/users/getUsers', UserController.getUsers);
// router.post('/admin/posts/deletePost', adminAuthMiddleware, PostController.dashboardDeletePost);
// router.get('/v1/users/getUserPageData', UserController.getUserPageData);
//router.post('/v1/users/getStartConversation', authMiddleware, UserController.getStartConversation);
//router.post('/admin/users/updateUser', adminAuthMiddleware, UserController.dashboardUpdateUser);
//router.get('/admin/widgets/getPopulatedWidgets', adminAuthMiddleware, WidgetController.getPopulatedWidgets);

//---------------------chatrooms----------------------
// router.get('/v1/chatrooms/loadOlderMessages',authMiddleware,ChatroomController.loadOlderMessages);
// router.get('/v1/chatrooms/getConversationsList',authMiddleware,ChatroomController.getConversationsList);
// router.get('/v1/chatrooms/getAConversation',authMiddleware,ChatroomController.getAConversation);
// router.post('/v1/chatrooms/startAConversation',authMiddleware,ChatroomController.startAConversation);
