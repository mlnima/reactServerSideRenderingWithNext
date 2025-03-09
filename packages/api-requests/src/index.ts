export {default as AxiosInstance} from './lib/AxiosInstance';
export {getAxiosInstance} from './lib/AxiosInstance';

export {
    commonAPIRequestGetSignedInUserData,
    commonAPIRequestLoginUser,
    getUserSuggestionList
} from './common/commonUsers'

export {
    clientAPIRequestDeletePostImage,
    clientAPIRequestDeletePostImages,
    clientAPIRequestUploadPostImages,
    clientAPIRequestUploadProfileImage
} from './client/clientFileManager';

export {
} from './client/clientMessenger';


export {
    updatePost,
    clientDeletePostByAuthor,
} from './client/clientPosts';

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