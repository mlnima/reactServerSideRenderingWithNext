// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import {PostRaw} from "typescript-types/src/Post";
import {
    dashboardAPIRequestReadPath,
    dashboardAPIRequestDeleteFile,
    dashboardAPIRequestCreateFolder,
    dashboardAPIRequestCreateFile,
    dashboardAPIRequestUpdateTranslationFile,
    dashboardAPIRequestUploadFile,
    dashboardAPIRequestReadTranslationFile,
    dashboardAPIRequestCreateFileOrFolder,
} from "api-requests";

const initialState = {
    path: './public',
    prevPath: './public',
    files: [],
    clickedItem: '',
    clickedItemName: '',
    file: '',
    editFile: false,
    action: '',
    _do: '',
    DeleteAlertBox: false,
    confirm: Date.now(),
    message: '',
    report: '',
    inputBox: false,
    newItemName: '',
    lastUpdate: '0000000000000',
    createNewFileFolderPop: false,
    createNewFileFolderPopType: 'file',
    translationsData: ''
}

export const readThePathAction = createAsyncThunk(
    'adminPanelFileManager/readThePathAction',
    async ({path, prevPath}: { path: string, prevPath: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
//@ts-ignore
        return await dashboardAPIRequestReadPath(path).then((response: AxiosResponse<any>)  => {
            if (response.data.type === 'dir') {
                return {files: response.data.data}
            } else if (response.data.type === 'file') {
                return {
                    clickedItem: path,
                    path: prevPath,
                    file: response.data.data
                }
            } else {
                thunkAPI.dispatch(setAlert({message: 'Something Went Wrong', type: 'error'}))
            }

        }).catch((error: AxiosError<any>)  => {

            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error', err:error}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const filManagerDeleteFileAction = createAsyncThunk(
    'adminPanelFileManager/filManagerDeleteFileAction',
    async ({filePath, data}: { filePath: string, data: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestDeleteFile(filePath).then((response: AxiosResponse<any>)  => {

            thunkAPI.dispatch(setAlert({message: 'Deleted', type: 'success'}))
            return data

        }).catch((error: AxiosError<any>) => {

            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchFilManagerCreateNewFolder = createAsyncThunk(
    'adminPanelFileManager/fetchFilManagerCreateNewFolder',
    async ({folderName, folderPath}: { folderName: string, folderPath: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestCreateFolder(folderName,folderPath).then((response: AxiosResponse<any>)  => {

            thunkAPI.dispatch(setAlert({message: 'Created', type: 'success'}))

        }).catch((error: AxiosError<any>) => {

            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchFilManagerCreateNewFile = createAsyncThunk(
    'adminPanelFileManager/fetchFilManagerCreateNewFile',
    async ({fileName, filePath}: { fileName: string, filePath: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        let body = {
            fileName,
            filePath,
            token: localStorage.wt
        };

        return await dashboardAPIRequestCreateFile(fileName, filePath).then((response: AxiosResponse<any>)  => {
            thunkAPI.dispatch(setAlert({message: 'Created', type: 'success'}))

        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const updateTranslationsFileAction = createAsyncThunk(
    'adminPanelFileManager/updateTranslationsFileAction',
    async ({path, data}: { path: string, data: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))



        return await dashboardAPIRequestUpdateTranslationFile(path, data).then((response: AxiosResponse<any>)  => {

            thunkAPI.dispatch(setAlert({message: 'Updated', type: 'success'}))

        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const uploadFileAction = createAsyncThunk(
    'adminPanelFileManager/uploadFileAction',
    async ({file, useType, postData}: { file: any, useType: string, postData?: PostRaw | undefined }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        //@ts-ignore
        return await dashboardAPIRequestUploadFile(file).then((response: AxiosResponse<any>) => {
            if (useType === 'fileManagerFileUpload') {
                return {
                    clickedItem: response.data?.path?.replace('./', ''),
                    clickedItemName: response.data?.path?.split('/')[response?.data?.path?.split('/')?.length - 1]
                }
            } else if (useType === 'postMainThumbnail') {
                return {'mainThumbnail': response.data?.path?.replace('./', '/')}
            } else if (useType === 'postImageGallery') {

                return {'images': [...(postData?.images || []), response.data.path.replace('./', '/')]}
            } else if (useType === 'postVideoUrl') {
                return {'videoUrl': response.data?.path?.replace('./', '/')}
            } else if (useType === 'postVideoTrailerUrl') {
                return {'VideoTrailerUrl': response.data?.path?.replace('./', '/')}
            }

        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)




export const readTranslationsFileAction = createAsyncThunk(
    'adminPanelFileManager/readTranslationsFileAction',
    async (path: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

       return await dashboardAPIRequestReadTranslationFile(path).then((response: AxiosResponse<any>) => {
            return response.data.data
        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const createFileOrFolderAction = createAsyncThunk(
    'adminPanelFileManager/createFileOrFolderAction',
    async (data: {Path:string,fileFolderName:string,type:string}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ...data,
            token: localStorage.wt
        }
       return await dashboardAPIRequestCreateFileOrFolder(data).then((response: AxiosResponse<any>) => {
            return response.data.data
        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


//need to move in post reducers
export const fileManagerSlice = createSlice({
    name: 'adminPanelFileManager',
    initialState,
    reducers: {
        fileManagerClosePopupAction: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        fileManagerEditState: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        editTranslationsFileAction: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                translationsData:action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(readThePathAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(filManagerDeleteFileAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(uploadFileAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(readTranslationsFileAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    translationsData: action.payload
                };
            })
    }
})


export const {fileManagerClosePopupAction, fileManagerEditState,editTranslationsFileAction} = fileManagerSlice.actions

export const fileManagerReducer = (state: RootState) => state?.fileManager || null

export default fileManagerSlice.reducer