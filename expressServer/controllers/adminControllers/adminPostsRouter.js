"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
//middlewares
var adminAuthMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/adminAuthMiddleware"));
var apiRequestMiddleware_1 = tslib_1.__importDefault(require("../../middlewares/apiRequestMiddleware"));
//API Controllers
var adminCreateNewPostByApi_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminCreateNewPostByApi"));
var adminUpdatePostByApi_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminUpdatePostByApi"));
//------
var adminCreateNewPost_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminCreateNewPost"));
var adminUpdatePost_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminUpdatePost"));
var adminDeletePost_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminDeletePost"));
var adminPostsBulkAction_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminPostsBulkAction"));
var adminBulkAction_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminBulkAction"));
var adminExportPosts_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminExportPosts"));
var adminUpdateMeta_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminUpdateMeta"));
var adminDeleteMeta_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminDeleteMeta"));
var adminUpdateComment_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminUpdateComment"));
var adminDeleteComments_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminDeleteComments"));
var adminGetComments_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminGetComments"));
var adminGetMeta_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminGetMeta"));
var adminGetMetas_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminGetMetas"));
var adminCheckAndRemoveDeletedVideos_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminCheckAndRemoveDeletedVideos"));
var adminSetMetaThumbnailsAndCount_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminSetMetaThumbnailsAndCount"));
var adminImportPosts_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminImportPosts"));
var adminUpdateMetaByApi_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminUpdateMetaByApi"));
var adminGetPost_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminGetPost"));
var adminGetPosts_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminGetPosts"));
var adminGeneratePermaLinkForPosts_1 = tslib_1.__importDefault(require("./adminPostsControllers/adminGeneratePermaLinkForPosts"));
var router = express_1.default.Router();
router.post('/createNewPost', adminAuthMiddleware_1.default, adminCreateNewPost_1.default);
router.post('/adminImportPosts', adminAuthMiddleware_1.default, adminImportPosts_1.default);
router.post('/updatePost', adminAuthMiddleware_1.default, adminUpdatePost_1.default);
router.post('/deletePost', adminAuthMiddleware_1.default, adminDeletePost_1.default);
router.post('/postsBulkAction', adminAuthMiddleware_1.default, adminPostsBulkAction_1.default);
router.post('/bulkAction', adminAuthMiddleware_1.default, adminBulkAction_1.default);
router.post('/exportPosts', adminAuthMiddleware_1.default, adminExportPosts_1.default);
router.post('/updateMeta', adminAuthMiddleware_1.default, adminUpdateMeta_1.default);
router.post('/deleteMeta', adminAuthMiddleware_1.default, adminDeleteMeta_1.default);
router.post('/updateComment', adminAuthMiddleware_1.default, adminUpdateComment_1.default);
router.post('/deleteComments', adminAuthMiddleware_1.default, adminDeleteComments_1.default);
router.post('/getComments', adminAuthMiddleware_1.default, adminGetComments_1.default);
router.get('/getPost', adminAuthMiddleware_1.default, adminGetPost_1.default);
router.get('/getPosts', adminAuthMiddleware_1.default, adminGetPosts_1.default);
router.get('/getMeta', adminAuthMiddleware_1.default, adminGetMeta_1.default);
router.get('/getMetas', adminAuthMiddleware_1.default, adminGetMetas_1.default);
router.get('/checkAndRemoveDeletedVideos', adminAuthMiddleware_1.default, adminCheckAndRemoveDeletedVideos_1.default);
router.get('/setMetaThumbnailsAndCount', adminAuthMiddleware_1.default, adminSetMetaThumbnailsAndCount_1.default);
router.get('/generatePermaLinkForPosts', adminAuthMiddleware_1.default, adminGeneratePermaLinkForPosts_1.default);
//API routes
router.post('/createNewByApi', express_1.default.json({ limit: '50MB' }), apiRequestMiddleware_1.default, adminCreateNewPostByApi_1.default);
router.post('/updatePostByApi', apiRequestMiddleware_1.default, adminUpdatePostByApi_1.default);
router.post('/updateMetaByApi', apiRequestMiddleware_1.default, adminUpdateMetaByApi_1.default);
//------
exports.default = router;
//# sourceMappingURL=adminPostsRouter.js.map