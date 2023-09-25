export {default as AxiosInstance} from './lib/AxiosInstance';
export {getAxiosInstance} from './lib/AxiosInstance';
//______COMMON______
export {
    commonAPIRequestGetSignedInUserData,
    commonAPIRequestLoginUser
} from './common/commonUsers'

export {default as commonAPIRequestClearCaches} from './common/clearCaches'

//______CLIENT (Web-App) USE IT NOW______
//chatrooms
export {clientAPIRequestGetChatroom} from './client/clientChatrooms';

//comments
export {
    clientAPIRequestDeleteCommentByAdmin,
    clientAPIRequestGetPostComments,
    clientAPIRequestPostNewComment
} from './client/clientComments';

//customPages
export {clientAPIRequestGetPage} from './client/clientCustomPages';

//fileManager
export {clientAPIRequestUploadImage} from './client/clientFileManager';

//messenger
export {
    clientAPIRequestGetAConversation,
    clientAPIRequestGetConversationsList,
    clientAPIRequestLoadOlderMessages,
    clientAPIRequestStartAConversation,
} from './client/clientMessenger';

//metas
export {
    clientAPIRequestGetMetas,
    clientAPIRequestGetMetaSuggestion,
    clientAPIRequestResetMetaImage,
    clientAPIRequestGetTags
} from './client/clientMetas';

//posts
export {
    clientAPIRequestAttendToEvent,
    clientAPIRequestCreateNewPost,
    clientAPIRequestDisLikePost,
    clientAPIRequestGetEditingPost,
    clientAPIRequestGetPost,
    clientAPIRequestGetPosts,
    clientAPIRequestLikePost,
    clientAPIRequestUpdatePost,
    clientAPIRequestViewPost,
    clientDeletePostByAuthor
} from './client/clientPosts';

//settings
export {
    clientAPIRequestGetUncachedSettings,
    clientAPIRequestGetSettings,
} from './client/clientSettings';

//users
export {
    // clientAPIRequestDeleteChatroomMessage,
    clientAPIRequestDeleteConversation,
    clientAPIRequestFollowUser,
    clientAPIRequestGetConversations,
    clientAPIRequestGetUserPageData,
    clientAPIRequestGetUsers,
    clientAPIRequestRegisterUser,
    clientAPIRequestResetPassword,
    clientAPIRequestSendPrivateMessage,
    clientAPIRequestUnFollowUser,
} from './client/clientUsers';

//widgets
export {
    clientAPIRequestGetUncachedWidgetsForAdmin,
    clientAPIRequestSaveFormData,
    clientAPIRequestGetWidgets
} from './client/clientWidgets';

//______DASHBOARD PANEL (Web-DASHBOARD-App) USE IT NOW______

//backup
export {dashboardAPIRequestBackupMetas} from './dashboard/dashboardBackup'

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
    dashboardAPIRequestSyncDuplicateMetas

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