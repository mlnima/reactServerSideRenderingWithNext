import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosInstance} from "api-requests";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import {PostRaw} from "typescript-types/src/Post";

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

export const fetchFilManagerReadPath = createAsyncThunk(
    'adminPanelFileManager/fetchFilManagerReadPath',
    async ({path, prevPath}: { path: string, prevPath: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        let body = {
            path,
            token: localStorage.wt
        };

        return await AxiosInstance.post('/api/admin/fileManager/readPath', body).then((response: AxiosResponse<any>)  => {
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

export const fetchFilManagerDeleteFile = createAsyncThunk(
    'adminPanelFileManager/fetchFilManagerDeleteFile',
    async ({filePath, data}: { filePath: string, data: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        let body = {
            filePath,
            token: localStorage.wt
        };

        return await AxiosInstance.post('/api/admin/fileManager/deleteFile', body).then((response: AxiosResponse<any>)  => {

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

        let body = {
            folderName,
            folderPath,
            token: localStorage.wt
        };

        return await AxiosInstance.post('/expressServer/files/admin-newFolder', body).then((response: AxiosResponse<any>)  => {

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

        return await AxiosInstance.post('/expressServer/files/admin-newFile', body).then((response: AxiosResponse<any>)  => {
            thunkAPI.dispatch(setAlert({message: 'Created', type: 'success'}))

        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchUpdateTranslationsFile = createAsyncThunk(
    'adminPanelFileManager/fetchUpdateTranslationsFile',
    async ({path, data}: { path: string, data: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        let body = {
            path,
            data,
            token: localStorage.wt
        };

        return await AxiosInstance.post('/api/admin/fileManager/updateTranslationsFile', body).then((response: AxiosResponse<any>)  => {

            thunkAPI.dispatch(setAlert({message: 'Updated', type: 'success'}))

        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchFileManagerUploadFile = createAsyncThunk(
    'adminPanelFileManager/fetchFileManagerUploadFile',
    async ({file, useType, postData}: { file: any, useType: string, postData?: PostRaw }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await AxiosInstance.post('/api/admin/fileManager/uploadFile', file).then((response: AxiosResponse<any>) => {
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




export const fetchReadTranslationsFile = createAsyncThunk(
    'adminPanelFileManager/fetchReadTranslationsFile',
    async (path: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        let body = {
            path,
            token: localStorage.wt
        };
       return await AxiosInstance.post('/api/admin/fileManager/readTranslationsFile', body).then((response: AxiosResponse<any>) => {
            return response.data.data
        }).catch((error: AxiosError<any>) => {
            thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const createFileOrFolder = createAsyncThunk(
    'adminPanelFileManager/createFileOrFolder',
    async (data: {Path:string,fileFolderName:string,type:string}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ...data,
            token: localStorage.wt
        }
       return await AxiosInstance.post('/api/admin/fileManager/create', body).then((response: AxiosResponse<any>) => {
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
        adminPanelFileManagerClosePopup: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        adminPanelFileManagerEditState: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        adminPanelEditTranslationsFile: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                translationsData:action.payload
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilManagerReadPath.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(fetchFilManagerDeleteFile.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(fetchFileManagerUploadFile.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(fetchReadTranslationsFile.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    translationsData: action.payload
                };
            })
    }
})


export const {adminPanelFileManagerClosePopup, adminPanelFileManagerEditState,adminPanelEditTranslationsFile} = fileManagerSlice.actions

export const fileManagerReducer = (state: RootState) => state?.fileManager || null

export default fileManagerSlice.reducer