export {default as AxiosInstance} from './lib/AxiosInstance';
export {getAxiosInstance} from './lib/AxiosInstance';
//______COMMON______
export {
    commonAPIRequestGetSignedInUserData,
    commonAPIRequestLoginUser
} from './common/commonUsers'

// export {
//     checkImageStatusCode,
// } from './common/checkExternalContent'

export {default as commonAPIRequestClearCaches} from './common/clearCaches'

//______CLIENT (Web-App) USE IT NOW______
//chatrooms
// export {clientAPIRequestGetChatroom} from './client/clientChatrooms';

//comments
export {

    clientAPIRequestGetPostComments,
    clientAPIRequestPostNewComment
} from './client/clientComments';

//customPages
export {clientAPIRequestGetPage} from './client/clientCustomPages';

//fileManager
export {
    // clientAPIRequestUploadImage,
    clientAPIRequestDeletePostImage,
    clientAPIRequestDeletePostImages,
    clientAPIRequestUploadPostImages,
    clientAPIRequestUploadProfileImage

} from './client/clientFileManager';

//messenger
export {
    clientAPIRequestGetAConversation,
    clientAPIRequestGetConversationsList,
    clientAPIRequestLoadOlderMessages,
    clientAPIRequestStartAConversation,
} from './client/clientMessenger';

//metas
export {
    clientAPIRequestGetMetaSuggestion,
    clientAPIRequestResetMetaImage,
    getMeta
} from './client/clientMetas';

//posts
export {
    clientAPIRequestCreateNewPost,
    // clientAPIRequestDisLikePost,
    clientAPIRequestGetEditingPost,
    clientAPIRequestGetPosts,
    // clientAPIRequestLikePost,
    updatePost,
    // checkPostExist,
    clientAPIRequestViewPost,
    clientDeletePostByAuthor,
    clientAPIRequestLikeDislikePost,
    clientCheckDeletedVideo
} from './client/clientPosts';

//settings
export {
    clientAPIRequestGetUncachedSettings,
    clientAPIRequestGetSettings,
    getSettingsBuild,
    shutdownBuildServer
} from './client/clientSettings';

//users
export {
    // clientAPIRequestDeleteChatroomMessage,
    clientAPIRequestDeleteConversation,
    clientAPIRequestFollowUser,
    clientAPIRequestGetConversations,
    // clientAPIRequestGetUserPageData,
    // clientAPIRequestGetUsers,
    clientAPIRequestRegisterUser,
    clientAPIRequestResetPassword,
    // clientAPIRequestSendPrivateMessage,
    clientAPIRequestUnFollowUser,
} from './client/clientUsers';

//widgets
export {
    // clientAPIRequestGetUncachedWidgetsForAdmin,
    clientAPIRequestSaveFormData,
} from './client/clientWidgets';

//______DASHBOARD PANEL (Web-DASHBOARD-App) USE IT NOW______

//backup
export {dashboardAPIRequestBackupMetas,backupPosts,backup} from './dashboard/dashboardBackup'

//chatrooms
export {
    dashboardAPIRequestCreateChatroom,
    dashboardAPIRequestDeleteChatroom,
    dashboardAPIRequestGetChatroom,
    dashboardAPIRequestGetChatrooms,
    dashboardAPIRequestUpdateChatroom,

} from './dashboard/dashboardChatrooms'

//comments
export {
    dashboardAPIRequestDeleteComments,
    dashboardAPIRequestGetComments,
} from './dashboard/dashboardComments'


//fileManager
export {
    dashboardAPIRequestCreateFile,
    dashboardAPIRequestCreateFileOrFolder,
    dashboardAPIRequestCreateFolder,
    dashboardAPIRequestDeleteFile,
    dashboardAPIRequestReadPath,
    dashboardAPIRequestReadTranslationFile,
    dashboardAPIRequestUpdateTranslationFile,
    dashboardAPIRequestUploadFile,

} from './dashboard/dashboardFileManager'

//forms
export {
    dashboardAPIRequestDeleteForm,
    dashboardAPIRequestGetForm,
    dashboardAPIRequestGetForms,
} from './dashboard/dashboardForms'

//metas
export {
    dashboardAPIRequestBulkActionOnMetas,
    dashboardAPIRequestDeleteMeta,
    dashboardAPIRequestGetMeta,
    dashboardAPIRequestGetMetas,
    dashboardAPIRequestSetMetaThumbnailsAndCount,
    dashboardAPIRequestUpdateMeta,
    dashboardDeleteDuplicateMetas

} from './dashboard/dashboardMetas'

//pages
export {
    dashboardAPIRequestCreateNewPage,
    dashboardAPIRequestDeletePage,
    dashboardAPIRequestGetPage,
    dashboardAPIRequestGetPages,
    dashboardAPIRequestUpdatePage,
} from './dashboard/dashbioardPages'

//posts

export {
    dashboardAPIRequestBulkActionOnPosts,
    dashboardAPIRequestCheckAndRemoveDeletedVideos,
    dashboardAPIRequestCreateNewPost,
    dashboardAPIRequestExportPosts,
    dashboardAPIRequestGeneratePermaLinkForPosts,
    dashboardAPIRequestGetPost,
    dashboardAPIRequestGetPosts,
    dashboardAPIRequestPostDataScrappers,
    dashboardAPIRequestScrapYoutubeInfo,
    dashboardAPIRequestUpdatePost,
    dashboardAPIRequestFindAnotherSimilarSourceLink
} from './dashboard/dashboardPosts'

//settings

export {
    dashboardAPIRequestGetSettings,
    dashboardAPIRequestUpdateSetting,

} from './dashboard/dashboardSettings'

//users

export {
    dashboardAPIRequestChangePassword,
    dashboardAPIRequestDeleteUser,
    dashboardAPIRequestGenerateNewAPIKey,
    dashboardAPIRequestGetUser,
    dashboardAPIRequestGetUsers,
    dashboardAPIRequestUpdateUser,
} from './dashboard/dashboardUsers'


//widgets
export {
    dashboardAPIRequestCreateNewWidget,
    dashboardAPIRequestDeleteWidget,
    dashboardAPIRequestGetWidgets,
    dashboardAPIRequestUpdateWidget

} from './dashboard/dashboardWidgets'

export {
    dashboardAPIRequestGenerateSiteMaps
} from './dashboard/sitemaps'