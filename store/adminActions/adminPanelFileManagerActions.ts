//adminPanelFileManagerActions


import {EDIT_POST_FIELD, LOADING, SET_ALERT} from "@store/types";
import axios from "axios";
import Axios from "@_variables/util/Axios";
import {
    ADMIN_PANEL_EDIT_TRANSLATIONS_FILE,
    ADMIN_PANEL_FILE_MANAGER_CLOSE_POPUP,
    ADMIN_PANEL_FILE_MANAGER_DELETE_FILE,
    ADMIN_PANEL_FILE_MANAGER_EDIT_STATE,
    ADMIN_PANEL_FILE_MANAGER_READ_PATH,
    ADMIN_PANEL_READ_TRANSLATIONS_FILE
} from "@store/adminTypes";
// import {readTranslationsFile} from "@_variables/_ajaxFilesVariables";

export const adminPanelFileManagerReadPath = (path: string,prevPath:string) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    let body = {
        path,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/fileManager/readPath', body).then(res=>{
        if (res.data.type === 'dir'){
            dispatch({
                type: ADMIN_PANEL_FILE_MANAGER_READ_PATH,
                payload: {files: res.data.data}
            })
        }else if (res.data.type === 'file'){
            dispatch({
                type: ADMIN_PANEL_FILE_MANAGER_READ_PATH,
                payload: {
                    clickedItem: path,
                    path:prevPath,
                    file:res.data.data
                }
            })
        }else {
            dispatch({
                type: SET_ALERT,
                payload: {message:'Something Went Wrong', type: 'Error'}
            })
        }

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}


//*****************need to check again
export const adminPanelFileManagerDeleteFile = (filePath: string,data:{}) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    let body = {
        filePath,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/fileManager/deleteFile', body).then(res=>{

        dispatch({
            type: ADMIN_PANEL_FILE_MANAGER_DELETE_FILE,
            payload: data
        })
        dispatch({
            type: SET_ALERT,
            payload: {message:'Deleted', type: 'success'}
        })

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}
export const adminPanelFileManagerCreateNewFolder = (folderName: string,folderPath:string) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    let body = {
        folderName,
        folderPath,
        token: localStorage.wt
    };
    await Axios.post('/server/files/admin-newFolder', body).then(res=>{
        dispatch({
            type: SET_ALERT,
            payload: {message:'Created', type: 'success'}
        })

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const adminPanelFileManagerCreateNewFile = (fileName: string,filePath:string) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    let body = {
        fileName,
        filePath,
        token: localStorage.wt
    };
    await Axios.post('/server/files/admin-newFile', body).then(res=>{
        dispatch({
            type: SET_ALERT,
            payload: {message:'Created', type: 'success'}
        })

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}



export const adminPanelFileManagerClosePopup = (data:{}) =>  (dispatch: any) => {
    dispatch({
        type: ADMIN_PANEL_FILE_MANAGER_CLOSE_POPUP,
        payload: data
    })
}


export const adminPanelReadTranslationsFile = (path: string) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    let body = {
        path,
        token: localStorage.wt
    };
    await Axios.post( '/api/admin/fileManager/readTranslationsFile', body).then(res=>{
        dispatch({
            type: ADMIN_PANEL_READ_TRANSLATIONS_FILE,
            payload: res.data.data
        })

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}
export const adminPanelEditState = (changes: {}) => async (dispatch: any) => {

    dispatch({
        type: ADMIN_PANEL_FILE_MANAGER_EDIT_STATE,
        payload: changes
    })
}
export const adminPanelEditTranslationsFile = (data: string) => async (dispatch: any) => {

    dispatch({
        type: ADMIN_PANEL_EDIT_TRANSLATIONS_FILE,
        payload: data
    })
}
export const adminPanelUpdateTranslationsFile = (path:string,data: string) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    let body = {
        path,
        data,
        token: localStorage.wt
    };
    Axios.post('/api/admin/fileManager/updateTranslationsFile', body).then(res=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: 'Updated', type: 'success'}
        })
    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))

}

export const adminPanelUploadFile = (file: any,useType:string,postData?:{}) => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    await Axios.post('/api/admin/fileManager/uploadFile', file).then(res=>{
        if (useType === 'fileManagerFileUpload'){
            dispatch({
                type: ADMIN_PANEL_FILE_MANAGER_EDIT_STATE,
                payload: {
                    clickedItem: res.data?.path?.replace('./', ''),
                    clickedItemName: res.data?.path?.split('/')[res?.data?.path?.split('/')?.length - 1]
                }
            })
        }else if (useType === 'postMainThumbnail'){
            dispatch({
                type: EDIT_POST_FIELD,
                payload: {'mainThumbnail': res.data?.path?.replace('./','/')}
            })

        }else if (useType === 'postImageGallery'){
            dispatch({
                type: EDIT_POST_FIELD,
                //@ts-ignore
                payload: {'images':  [...(postData?.images||[]), res.data.path.replace('./', '/')]}
            })
        }else if (useType === 'postVideoUrl'){
            dispatch({
                type: EDIT_POST_FIELD,
                //@ts-ignore
                payload: {'videoUrl':  res.data?.path?.replace('./','/')}
            })
        }else if (useType === 'postVideoTrailerUrl'){
            dispatch({
                type: EDIT_POST_FIELD,
                //@ts-ignore
                payload: {'VideoTrailerUrl':  res.data?.path?.replace('./','/')}
            })
        }

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response?.data?.message, type: 'Error'}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))

}


// export const adminPanelFileManagerReadFile = (path: string,prevPath:string) => async (dispatch: any) => {
//     dispatch({
//         type: LOADING,
//         payload: true
//     })
//     let body = {
//         path,
//         token: localStorage.wt
//     };
//     await Axios.post('/api/admin/fileManager/readPath', body).then(res=>{
//         if (res.data.type === 'dir'){
//             dispatch({
//                 type: ADMIN_PANEL_FILE_MANAGER_READ_PATH,
//                 payload: {files: res.data.data}
//             })
//         }else if (res.data.type === 'file'){
//             dispatch({
//                 type: ADMIN_PANEL_FILE_MANAGER_READ_PATH,
//                 payload: {
//                     clickedItem: path,
//                     path:prevPath,
//                     file:res.data.data
//                 }
//             })
//         }else {
//             dispatch({
//                 type: SET_ALERT,
//                 payload: {message:'Something Went Wrong', type: 'Error'}
//             })
//         }
//
//     }).catch(err=>{
//         dispatch({
//             type: SET_ALERT,
//             payload: {message: err.response?.data?.message, type: 'Error'}
//         })
//     }).finally(()=>{
//         dispatch({
//             type: LOADING,
//             payload: false
//         })
//     })
// }