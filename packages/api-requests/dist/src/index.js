"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestDeleteComments = exports.dashboardAPIRequestUpdateChatroom = exports.dashboardAPIRequestGetChatrooms = exports.dashboardAPIRequestGetChatroom = exports.dashboardAPIRequestDeleteChatroom = exports.dashboardAPIRequestCreateChatroom = exports.dashboardAPIRequestBackupMetas = exports.clientAPIRequestGetWidgets = exports.clientAPIRequestSaveFormData = exports.clientAPIRequestGetUncachedWidgetsForAdmin = exports.clientAPIRequestUnFollowUser = exports.clientAPIRequestSendPrivateMessage = exports.clientAPIRequestResetPassword = exports.clientAPIRequestRegisterUser = exports.clientAPIRequestGetUsers = exports.clientAPIRequestGetUserPageData = exports.clientAPIRequestGetConversations = exports.clientAPIRequestFollowUser = exports.clientAPIRequestDeleteConversation = exports.clientAPIRequestDeleteChatroomMessage = exports.clientAPIRequestGetSettings = exports.clientAPIRequestGetUncachedSettings = exports.clientAPIRequestViewPost = exports.clientAPIRequestUpdatePost = exports.clientAPIRequestLikePost = exports.clientAPIRequestGetPosts = exports.clientAPIRequestGetPost = exports.clientAPIRequestGetEditingPost = exports.clientAPIRequestDisLikePost = exports.clientAPIRequestCreateNewPost = exports.clientAPIRequestAttendToEvent = exports.clientAPIRequestGetTags = exports.clientAPIRequestResetMetaImage = exports.clientAPIRequestGetMetaSuggestion = exports.clientAPIRequestGetMetas = exports.clientAPIRequestStartAConversation = exports.clientAPIRequestLoadOlderMessages = exports.clientAPIRequestGetConversationsList = exports.clientAPIRequestGetAConversation = exports.clientAPIRequestUploadImage = exports.clientAPIRequestGetPage = exports.clientAPIRequestPostNewComment = exports.clientAPIRequestGetPostComments = exports.clientAPIRequestDeleteCommentByAdmin = exports.clientAPIRequestGetChatroom = exports.commonAPIRequestClearCaches = exports.commonAPIRequestLoginUser = exports.commonAPIRequestGetSignedInUserData = exports.getAxiosInstance = exports.AxiosInstance = void 0;
exports.dashboardAPIRequestUpdateWidget = exports.dashboardAPIRequestGetWidgets = exports.dashboardAPIRequestDeleteWidget = exports.dashboardAPIRequestCreateNewWidget = exports.dashboardAPIRequestUpdateUser = exports.dashboardAPIRequestGetUsers = exports.dashboardAPIRequestGetUser = exports.dashboardAPIRequestGenerateNewAPIKey = exports.dashboardAPIRequestDeleteUser = exports.dashboardAPIRequestChangePassword = exports.dashboardAPIRequestUpdateSetting = exports.dashboardAPIRequestGetSettings = exports.dashboardAPIRequestUpdatePost = exports.dashboardAPIRequestScrapYoutubeInfo = exports.dashboardAPIRequestPostDataScrappers = exports.dashboardAPIRequestGetPosts = exports.dashboardAPIRequestGetPost = exports.dashboardAPIRequestGeneratePermaLinkForPosts = exports.dashboardAPIRequestExportPosts = exports.dashboardAPIRequestCreateNewPost = exports.dashboardAPIRequestCheckAndRemoveDeletedVideos = exports.dashboardAPIRequestBulkActionOnPosts = exports.dashboardAPIRequestUpdatePage = exports.dashboardAPIRequestGetPages = exports.dashboardAPIRequestGetPage = exports.dashboardAPIRequestDeletePage = exports.dashboardAPIRequestCreateNewPage = exports.dashboardAPIRequestUpdateMeta = exports.dashboardAPIRequestSetMetaThumbnailsAndCount = exports.dashboardAPIRequestGetMetas = exports.dashboardAPIRequestGetMeta = exports.dashboardAPIRequestDeleteMeta = exports.dashboardAPIRequestBulkActionOnMetas = exports.dashboardAPIRequestGetForms = exports.dashboardAPIRequestGetForm = exports.dashboardAPIRequestDeleteForm = exports.dashboardAPIRequestUploadFile = exports.dashboardAPIRequestUpdateTranslationFile = exports.dashboardAPIRequestReadTranslationFile = exports.dashboardAPIRequestReadPath = exports.dashboardAPIRequestDeleteFile = exports.dashboardAPIRequestCreateFolder = exports.dashboardAPIRequestCreateFileOrFolder = exports.dashboardAPIRequestCreateFile = exports.dashboardAPIRequestGetComments = void 0;
var AxiosInstance_1 = require("./lib/AxiosInstance");
Object.defineProperty(exports, "AxiosInstance", { enumerable: true, get: function () { return __importDefault(AxiosInstance_1).default; } });
var AxiosInstance_2 = require("./lib/AxiosInstance");
Object.defineProperty(exports, "getAxiosInstance", { enumerable: true, get: function () { return AxiosInstance_2.getAxiosInstance; } });
//______COMMON______
var commonUsers_1 = require("./common/commonUsers");
Object.defineProperty(exports, "commonAPIRequestGetSignedInUserData", { enumerable: true, get: function () { return commonUsers_1.commonAPIRequestGetSignedInUserData; } });
Object.defineProperty(exports, "commonAPIRequestLoginUser", { enumerable: true, get: function () { return commonUsers_1.commonAPIRequestLoginUser; } });
var clearCaches_1 = require("./common/clearCaches");
Object.defineProperty(exports, "commonAPIRequestClearCaches", { enumerable: true, get: function () { return __importDefault(clearCaches_1).default; } });
//______CLIENT (Web-App) USE IT NOW______
//chatrooms
var clientChatrooms_1 = require("./client/clientChatrooms");
Object.defineProperty(exports, "clientAPIRequestGetChatroom", { enumerable: true, get: function () { return clientChatrooms_1.clientAPIRequestGetChatroom; } });
//comments
var clientComments_1 = require("./client/clientComments");
Object.defineProperty(exports, "clientAPIRequestDeleteCommentByAdmin", { enumerable: true, get: function () { return clientComments_1.clientAPIRequestDeleteCommentByAdmin; } });
Object.defineProperty(exports, "clientAPIRequestGetPostComments", { enumerable: true, get: function () { return clientComments_1.clientAPIRequestGetPostComments; } });
Object.defineProperty(exports, "clientAPIRequestPostNewComment", { enumerable: true, get: function () { return clientComments_1.clientAPIRequestPostNewComment; } });
//customPages
var clientCustomPages_1 = require("./client/clientCustomPages");
Object.defineProperty(exports, "clientAPIRequestGetPage", { enumerable: true, get: function () { return clientCustomPages_1.clientAPIRequestGetPage; } });
//fileManager
var clientFileManager_1 = require("./client/clientFileManager");
Object.defineProperty(exports, "clientAPIRequestUploadImage", { enumerable: true, get: function () { return clientFileManager_1.clientAPIRequestUploadImage; } });
//messenger
var clientMessenger_1 = require("./client/clientMessenger");
Object.defineProperty(exports, "clientAPIRequestGetAConversation", { enumerable: true, get: function () { return clientMessenger_1.clientAPIRequestGetAConversation; } });
Object.defineProperty(exports, "clientAPIRequestGetConversationsList", { enumerable: true, get: function () { return clientMessenger_1.clientAPIRequestGetConversationsList; } });
Object.defineProperty(exports, "clientAPIRequestLoadOlderMessages", { enumerable: true, get: function () { return clientMessenger_1.clientAPIRequestLoadOlderMessages; } });
Object.defineProperty(exports, "clientAPIRequestStartAConversation", { enumerable: true, get: function () { return clientMessenger_1.clientAPIRequestStartAConversation; } });
//metas
var clientMetas_1 = require("./client/clientMetas");
Object.defineProperty(exports, "clientAPIRequestGetMetas", { enumerable: true, get: function () { return clientMetas_1.clientAPIRequestGetMetas; } });
Object.defineProperty(exports, "clientAPIRequestGetMetaSuggestion", { enumerable: true, get: function () { return clientMetas_1.clientAPIRequestGetMetaSuggestion; } });
Object.defineProperty(exports, "clientAPIRequestResetMetaImage", { enumerable: true, get: function () { return clientMetas_1.clientAPIRequestResetMetaImage; } });
Object.defineProperty(exports, "clientAPIRequestGetTags", { enumerable: true, get: function () { return clientMetas_1.clientAPIRequestGetTags; } });
//posts
var clientPosts_1 = require("./client/clientPosts");
Object.defineProperty(exports, "clientAPIRequestAttendToEvent", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestAttendToEvent; } });
Object.defineProperty(exports, "clientAPIRequestCreateNewPost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestCreateNewPost; } });
Object.defineProperty(exports, "clientAPIRequestDisLikePost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestDisLikePost; } });
Object.defineProperty(exports, "clientAPIRequestGetEditingPost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestGetEditingPost; } });
Object.defineProperty(exports, "clientAPIRequestGetPost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestGetPost; } });
Object.defineProperty(exports, "clientAPIRequestGetPosts", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestGetPosts; } });
Object.defineProperty(exports, "clientAPIRequestLikePost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestLikePost; } });
Object.defineProperty(exports, "clientAPIRequestUpdatePost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestUpdatePost; } });
Object.defineProperty(exports, "clientAPIRequestViewPost", { enumerable: true, get: function () { return clientPosts_1.clientAPIRequestViewPost; } });
//settings
var clientSettings_1 = require("./client/clientSettings");
Object.defineProperty(exports, "clientAPIRequestGetUncachedSettings", { enumerable: true, get: function () { return clientSettings_1.clientAPIRequestGetUncachedSettings; } });
Object.defineProperty(exports, "clientAPIRequestGetSettings", { enumerable: true, get: function () { return clientSettings_1.clientAPIRequestGetSettings; } });
//users
var clientUsers_1 = require("./client/clientUsers");
Object.defineProperty(exports, "clientAPIRequestDeleteChatroomMessage", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestDeleteChatroomMessage; } });
Object.defineProperty(exports, "clientAPIRequestDeleteConversation", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestDeleteConversation; } });
Object.defineProperty(exports, "clientAPIRequestFollowUser", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestFollowUser; } });
Object.defineProperty(exports, "clientAPIRequestGetConversations", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestGetConversations; } });
Object.defineProperty(exports, "clientAPIRequestGetUserPageData", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestGetUserPageData; } });
Object.defineProperty(exports, "clientAPIRequestGetUsers", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestGetUsers; } });
Object.defineProperty(exports, "clientAPIRequestRegisterUser", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestRegisterUser; } });
Object.defineProperty(exports, "clientAPIRequestResetPassword", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestResetPassword; } });
Object.defineProperty(exports, "clientAPIRequestSendPrivateMessage", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestSendPrivateMessage; } });
Object.defineProperty(exports, "clientAPIRequestUnFollowUser", { enumerable: true, get: function () { return clientUsers_1.clientAPIRequestUnFollowUser; } });
//widgets
var clientWidgets_1 = require("./client/clientWidgets");
Object.defineProperty(exports, "clientAPIRequestGetUncachedWidgetsForAdmin", { enumerable: true, get: function () { return clientWidgets_1.clientAPIRequestGetUncachedWidgetsForAdmin; } });
Object.defineProperty(exports, "clientAPIRequestSaveFormData", { enumerable: true, get: function () { return clientWidgets_1.clientAPIRequestSaveFormData; } });
Object.defineProperty(exports, "clientAPIRequestGetWidgets", { enumerable: true, get: function () { return clientWidgets_1.clientAPIRequestGetWidgets; } });
//______DASHBOARD PANEL (Web-DASHBOARD-App) USE IT NOW______
//backup
var dashboardBackup_1 = require("./dashboard/dashboardBackup");
Object.defineProperty(exports, "dashboardAPIRequestBackupMetas", { enumerable: true, get: function () { return dashboardBackup_1.dashboardAPIRequestBackupMetas; } });
//chatrooms
var dashboardChatrooms_1 = require("./dashboard/dashboardChatrooms");
Object.defineProperty(exports, "dashboardAPIRequestCreateChatroom", { enumerable: true, get: function () { return dashboardChatrooms_1.dashboardAPIRequestCreateChatroom; } });
Object.defineProperty(exports, "dashboardAPIRequestDeleteChatroom", { enumerable: true, get: function () { return dashboardChatrooms_1.dashboardAPIRequestDeleteChatroom; } });
Object.defineProperty(exports, "dashboardAPIRequestGetChatroom", { enumerable: true, get: function () { return dashboardChatrooms_1.dashboardAPIRequestGetChatroom; } });
Object.defineProperty(exports, "dashboardAPIRequestGetChatrooms", { enumerable: true, get: function () { return dashboardChatrooms_1.dashboardAPIRequestGetChatrooms; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdateChatroom", { enumerable: true, get: function () { return dashboardChatrooms_1.dashboardAPIRequestUpdateChatroom; } });
//comments
var dashboardComments_1 = require("./dashboard/dashboardComments");
Object.defineProperty(exports, "dashboardAPIRequestDeleteComments", { enumerable: true, get: function () { return dashboardComments_1.dashboardAPIRequestDeleteComments; } });
Object.defineProperty(exports, "dashboardAPIRequestGetComments", { enumerable: true, get: function () { return dashboardComments_1.dashboardAPIRequestGetComments; } });
//fileManager
var dashboardFileManager_1 = require("./dashboard/dashboardFileManager");
Object.defineProperty(exports, "dashboardAPIRequestCreateFile", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestCreateFile; } });
Object.defineProperty(exports, "dashboardAPIRequestCreateFileOrFolder", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestCreateFileOrFolder; } });
Object.defineProperty(exports, "dashboardAPIRequestCreateFolder", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestCreateFolder; } });
Object.defineProperty(exports, "dashboardAPIRequestDeleteFile", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestDeleteFile; } });
Object.defineProperty(exports, "dashboardAPIRequestReadPath", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestReadPath; } });
Object.defineProperty(exports, "dashboardAPIRequestReadTranslationFile", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestReadTranslationFile; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdateTranslationFile", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestUpdateTranslationFile; } });
Object.defineProperty(exports, "dashboardAPIRequestUploadFile", { enumerable: true, get: function () { return dashboardFileManager_1.dashboardAPIRequestUploadFile; } });
//forms
var dashboardForms_1 = require("./dashboard/dashboardForms");
Object.defineProperty(exports, "dashboardAPIRequestDeleteForm", { enumerable: true, get: function () { return dashboardForms_1.dashboardAPIRequestDeleteForm; } });
Object.defineProperty(exports, "dashboardAPIRequestGetForm", { enumerable: true, get: function () { return dashboardForms_1.dashboardAPIRequestGetForm; } });
Object.defineProperty(exports, "dashboardAPIRequestGetForms", { enumerable: true, get: function () { return dashboardForms_1.dashboardAPIRequestGetForms; } });
//metas
var dashboardMetas_1 = require("./dashboard/dashboardMetas");
Object.defineProperty(exports, "dashboardAPIRequestBulkActionOnMetas", { enumerable: true, get: function () { return dashboardMetas_1.dashboardAPIRequestBulkActionOnMetas; } });
Object.defineProperty(exports, "dashboardAPIRequestDeleteMeta", { enumerable: true, get: function () { return dashboardMetas_1.dashboardAPIRequestDeleteMeta; } });
Object.defineProperty(exports, "dashboardAPIRequestGetMeta", { enumerable: true, get: function () { return dashboardMetas_1.dashboardAPIRequestGetMeta; } });
Object.defineProperty(exports, "dashboardAPIRequestGetMetas", { enumerable: true, get: function () { return dashboardMetas_1.dashboardAPIRequestGetMetas; } });
Object.defineProperty(exports, "dashboardAPIRequestSetMetaThumbnailsAndCount", { enumerable: true, get: function () { return dashboardMetas_1.dashboardAPIRequestSetMetaThumbnailsAndCount; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdateMeta", { enumerable: true, get: function () { return dashboardMetas_1.dashboardAPIRequestUpdateMeta; } });
//pages
var dashbioardPages_1 = require("./dashboard/dashbioardPages");
Object.defineProperty(exports, "dashboardAPIRequestCreateNewPage", { enumerable: true, get: function () { return dashbioardPages_1.dashboardAPIRequestCreateNewPage; } });
Object.defineProperty(exports, "dashboardAPIRequestDeletePage", { enumerable: true, get: function () { return dashbioardPages_1.dashboardAPIRequestDeletePage; } });
Object.defineProperty(exports, "dashboardAPIRequestGetPage", { enumerable: true, get: function () { return dashbioardPages_1.dashboardAPIRequestGetPage; } });
Object.defineProperty(exports, "dashboardAPIRequestGetPages", { enumerable: true, get: function () { return dashbioardPages_1.dashboardAPIRequestGetPages; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdatePage", { enumerable: true, get: function () { return dashbioardPages_1.dashboardAPIRequestUpdatePage; } });
//posts
var dashboardPosts_1 = require("./dashboard/dashboardPosts");
Object.defineProperty(exports, "dashboardAPIRequestBulkActionOnPosts", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestBulkActionOnPosts; } });
Object.defineProperty(exports, "dashboardAPIRequestCheckAndRemoveDeletedVideos", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestCheckAndRemoveDeletedVideos; } });
Object.defineProperty(exports, "dashboardAPIRequestCreateNewPost", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestCreateNewPost; } });
Object.defineProperty(exports, "dashboardAPIRequestExportPosts", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestExportPosts; } });
Object.defineProperty(exports, "dashboardAPIRequestGeneratePermaLinkForPosts", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestGeneratePermaLinkForPosts; } });
Object.defineProperty(exports, "dashboardAPIRequestGetPost", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestGetPost; } });
Object.defineProperty(exports, "dashboardAPIRequestGetPosts", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestGetPosts; } });
Object.defineProperty(exports, "dashboardAPIRequestPostDataScrappers", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestPostDataScrappers; } });
Object.defineProperty(exports, "dashboardAPIRequestScrapYoutubeInfo", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestScrapYoutubeInfo; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdatePost", { enumerable: true, get: function () { return dashboardPosts_1.dashboardAPIRequestUpdatePost; } });
//settings
var dashboardSettings_1 = require("./dashboard/dashboardSettings");
Object.defineProperty(exports, "dashboardAPIRequestGetSettings", { enumerable: true, get: function () { return dashboardSettings_1.dashboardAPIRequestGetSettings; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdateSetting", { enumerable: true, get: function () { return dashboardSettings_1.dashboardAPIRequestUpdateSetting; } });
//users
var dashboardUsers_1 = require("./dashboard/dashboardUsers");
Object.defineProperty(exports, "dashboardAPIRequestChangePassword", { enumerable: true, get: function () { return dashboardUsers_1.dashboardAPIRequestChangePassword; } });
Object.defineProperty(exports, "dashboardAPIRequestDeleteUser", { enumerable: true, get: function () { return dashboardUsers_1.dashboardAPIRequestDeleteUser; } });
Object.defineProperty(exports, "dashboardAPIRequestGenerateNewAPIKey", { enumerable: true, get: function () { return dashboardUsers_1.dashboardAPIRequestGenerateNewAPIKey; } });
Object.defineProperty(exports, "dashboardAPIRequestGetUser", { enumerable: true, get: function () { return dashboardUsers_1.dashboardAPIRequestGetUser; } });
Object.defineProperty(exports, "dashboardAPIRequestGetUsers", { enumerable: true, get: function () { return dashboardUsers_1.dashboardAPIRequestGetUsers; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdateUser", { enumerable: true, get: function () { return dashboardUsers_1.dashboardAPIRequestUpdateUser; } });
//widgets
var dashboardWidgets_1 = require("./dashboard/dashboardWidgets");
Object.defineProperty(exports, "dashboardAPIRequestCreateNewWidget", { enumerable: true, get: function () { return dashboardWidgets_1.dashboardAPIRequestCreateNewWidget; } });
Object.defineProperty(exports, "dashboardAPIRequestDeleteWidget", { enumerable: true, get: function () { return dashboardWidgets_1.dashboardAPIRequestDeleteWidget; } });
Object.defineProperty(exports, "dashboardAPIRequestGetWidgets", { enumerable: true, get: function () { return dashboardWidgets_1.dashboardAPIRequestGetWidgets; } });
Object.defineProperty(exports, "dashboardAPIRequestUpdateWidget", { enumerable: true, get: function () { return dashboardWidgets_1.dashboardAPIRequestUpdateWidget; } });
//# sourceMappingURL=index.js.map