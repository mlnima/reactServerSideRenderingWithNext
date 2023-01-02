import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosInstance} from "api-requests";
import {AxiosResponse} from "axios";
import {RootState} from "../store";
import {AdminPanelGlobalState,PageTypes} from "typescript-types";
import getPages from "api-requests/src/dashboard/pages/getPages";
import clearCaches from "api-requests/src/dashboard/clearCaches";

const initialState : AdminPanelGlobalState = {
    customPages: [],
    beforeUnload: false,
    sidebar: false,
    loading: false,
    alert: {
        active: false,
        type: undefined,
        err: undefined,
        message: ''
    }
}

export const getCustomPagesAction = createAsyncThunk(
    'adminPanelGlobalState/getCustomPagesAction',
    async (data:any , thunkAPI) => {
        return await getPages({})
        // return AxiosInstance.post('/api/admin/pages/getPagesData', {token: localStorage.wt})
            .then((response: AxiosResponse<unknown | any>) => {
                if (response.data?.pages) {
                    return response.data.pages.map((page: PageTypes) => page.pageName)
                }
            }).catch(err => {
                console.log(err)
            })
    }
)

export const fetchClearCaches = createAsyncThunk(
    'adminPanelGlobalState/fetchClearCaches',
    async ({router} :{router?: any}, thunkAPI) => {
         thunkAPI.dispatch(loading(true))
        return await clearCaches().then((res: AxiosResponse<unknown | any>) => {
            thunkAPI.dispatch(setAlert({message: res.data.message || 'done', type: 'success'}))
            // if (router){
            //     setTimeout(() => router.reload(), 1000)
            // }

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message:'Error While Deleting Cache', type: 'error', err}))
        }).finally(() =>  thunkAPI.dispatch(loading(false)))
    }
)

export const globalStateSlice = createSlice({
    name: 'adminPanelGlobalState',
    initialState,
    reducers: {
        setSidebarStatus:(state, action: PayloadAction<any>) =>{
            state.sidebar = action.payload
        },

        loading: (state, action: PayloadAction<any>) => {
            state.loading = action.payload
        },
        setAlert: (state, action: PayloadAction<any>) => {
            state.alert = {
                ...action.payload,
                active: true,
            }
        },
        closeAlert: (state, action: PayloadAction<any>) => {
            state.alert = {
                active: false,
                type: undefined,
                err: undefined,
                message: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomPagesAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                customPages: action.payload
            };
        })
    }
})

export const {setSidebarStatus,loading,setAlert,closeAlert} = globalStateSlice.actions

export const globalStateReducer = (state: RootState) => state?.globalState || null

export default globalStateSlice.reducer