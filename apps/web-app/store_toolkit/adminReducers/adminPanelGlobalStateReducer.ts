import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios from "@_variables/Axios";
import {AxiosResponse} from "axios";

import {NextRouter} from "next/router";
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
        type: null,
        err: null,
        message: ''
    }
}

export const fetchCustomPages = createAsyncThunk(
    'adminPanelGlobalState/fetchCustomPages',
    async (data:any , thunkAPI) => {
        return await getPages({})
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
    async ({router} :{router?: NextRouter}, thunkAPI) => {
         thunkAPI.dispatch(loading(true))
        return await clearCaches().then((res: AxiosResponse<unknown | any>) => {
            thunkAPI.dispatch(setAlert({message: res.data.message || 'done', type: 'success'}))
            setTimeout(() => router.reload(), 1000)
        }).catch(err => {
            thunkAPI.dispatch(setAlert({message:'Error While Deleting Cache', type: 'error', err}))
        }).finally(() =>  thunkAPI.dispatch(loading(false)))
    }
)




export const adminPanelGlobalStateSlice = createSlice({
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
                type: null,
                message: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomPages.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                customPages: action.payload
            };
        })
    }
})

export const {setSidebarStatus,loading,setAlert,closeAlert} = adminPanelGlobalStateSlice.actions

export const adminPanelGlobalStateReducer = (state: RootState) => state?.adminPanelGlobalState || null

export default adminPanelGlobalStateSlice.reducer