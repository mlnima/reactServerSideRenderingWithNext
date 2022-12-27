import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "../clientReducers/globalStateReducer";
import Axios from "@_variables/Axios";
import {RootState} from "../store";
import readPath from "api-requests/src/dashboard/fileManager/readPath";
import deleteFile from "api-requests/src/dashboard/fileManager/deleteFile";
import createFolder from "api-requests/src/dashboard/fileManager/createFolder";
import createFile from "api-requests/src/dashboard/fileManager/createFile";
import updateTranslationFile from "api-requests/src/dashboard/fileManager/updateTranslationFile";
import uploadFile from "api-requests/src/dashboard/fileManager/uploadFile";
import readTranslationFile from "api-requests/src/dashboard/fileManager/readTranslationFile";

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
    // AlertBox:false,
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

        return await readPath(path).then(res => {
            if (res.data.type === 'dir') {
                return {files: res.data.data}
            } else if (res.data.type === 'file') {
                return {
                    clickedItem: path,
                    path: prevPath,
                    file: res.data.data
                }
            } else {
                thunkAPI.dispatch(setAlert({message: 'Something Went Wrong', type: 'error'}))
            }

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error', err}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchFilManagerDeleteFile = createAsyncThunk(
    'adminPanelFileManager/fetchFilManagerDeleteFile',
    async ({filePath, data}: { filePath: string, data: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await deleteFile(filePath).then(res => {

            thunkAPI.dispatch(setAlert({message: 'Deleted', type: 'success'}))
            return data

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))
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

        return await createFolder(folderName,folderPath).then(res => {

            thunkAPI.dispatch(setAlert({message: 'Created', type: 'success'}))

        }).catch(err => {

            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchFilManagerCreateNewFile = createAsyncThunk(
    'adminPanelFileManager/fetchFilManagerCreateNewFile',
    async ({fileName, filePath}: { fileName: string, filePath: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await createFile(fileName, filePath).then(res => {
            thunkAPI.dispatch(setAlert({message: 'Created', type: 'success'}))

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchUpdateTranslationsFile = createAsyncThunk(
    'adminPanelFileManager/fetchUpdateTranslationsFile',
    async ({path, data}: { path: string, data: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await updateTranslationFile(path, data).then(res => {

            thunkAPI.dispatch(setAlert({message: 'Updated', type: 'success'}))

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchFileManagerUploadFile = createAsyncThunk(
    'adminPanelFileManager/fetchFileManagerUploadFile',
    async ({file, useType, postData}: { file: any, useType: string, postData?: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await uploadFile(file).then(res => {
            if (useType === 'fileManagerFileUpload') {
                return {
                    clickedItem: res.data?.path?.replace('./', ''),
                    clickedItemName: res.data?.path?.split('/')[res?.data?.path?.split('/')?.length - 1]
                }
            } else if (useType === 'postMainThumbnail') {
                return {'mainThumbnail': res.data?.path?.replace('./', '/')}
            } else if (useType === 'postImageGallery') {
                //@ts-ignore
                return {'images': [...(postData?.images || []), res.data.path.replace('./', '/')]}
            } else if (useType === 'postVideoUrl') {
                return {'videoUrl': res.data?.path?.replace('./', '/')}
            } else if (useType === 'postVideoTrailerUrl') {
                return {'VideoTrailerUrl': res.data?.path?.replace('./', '/')}
            }

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)




export const fetchReadTranslationsFile = createAsyncThunk(
    'adminPanelFileManager/fetchReadTranslationsFile',
    async (path: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

       return await readTranslationFile(path).then(res => {
            return res.data.data
        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))
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
       return await createFileOrFolder(data).then(res => {
            return res.data.data
        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


//need to move in post reducers
export const adminPanelFileManagerSlice = createSlice({
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


export const {adminPanelFileManagerClosePopup, adminPanelFileManagerEditState,adminPanelEditTranslationsFile} = adminPanelFileManagerSlice.actions

export const adminPanelFileManagerReducer = (state: RootState) => state?.adminPanelFileManager || null

export default adminPanelFileManagerSlice.reducer