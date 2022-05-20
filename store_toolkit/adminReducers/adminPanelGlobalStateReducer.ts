import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios from "@_variables/util/Axios";
import axios, {AxiosResponse} from "axios";
import {PageTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {NextRouter} from "next/router";
import {RootState} from "@store_toolkit/store";

export interface AdminPanelGlobalState {
    customPages: string[],
    sidebar: boolean
}

const initialState : AdminPanelGlobalState = {
    customPages: [],
    sidebar: false,
}

export const fetchCustomPages = createAsyncThunk(
    'adminPanelGlobalState/fetchCustomPages',
    async (data:any , thunkAPI) => {
        return Axios.post('/api/admin/pages/getPagesData', {token: localStorage.wt})
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
        return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/clearCaches?token=${localStorage.wt}`).then((res: AxiosResponse<unknown | any>) => {

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

export const {setSidebarStatus} = adminPanelGlobalStateSlice.actions

export const adminPanelGlobalStateReducer = (state: RootState) => state?.adminPanelGlobalState || null

export default adminPanelGlobalStateSlice.reducer