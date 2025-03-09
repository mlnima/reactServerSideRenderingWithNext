import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {RootState} from "../storeDashboard";
import {AdminPanelGlobalState,IPage} from "@repo/typescript-types";
import {dashboardAPIRequestGetPages} from "@repo/api-requests";

const initialState : AdminPanelGlobalState = {
    customPages: [],
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
        return await dashboardAPIRequestGetPages({})
        // return AxiosInstance.post('/api/dashboard/pages/getPagesData', {token: localStorage.wt})
            .then((response: AxiosResponse<unknown | any>) => {
                if (response.data?.pages) {
                    return response.data.pages.map((page: IPage) => page.pageName)
                }
            }).catch(err => {
                console.log(err)
            })
    }
)

export const clearCachesAction = createAsyncThunk(
    'adminPanelGlobalState/clearCachesAction',
    async ({} , thunkAPI) => {
        console.log('clearCachesAction')
         thunkAPI.dispatch(loading(true))
        return
        // return await commonAPIRequestClearCaches().then((res: AxiosResponse<unknown | any>) => {
        //
        //     thunkAPI.dispatch(setAlert({message: res.data.message || 'done', type: 'success'}))
        // }).catch(err => {
        //     console.log(err)
        //     thunkAPI.dispatch(setAlert({message:'Error While Deleting Cache', type: 'error', err}))
        // }).finally(() =>  thunkAPI.dispatch(loading(false)))
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

export const {
    setSidebarStatus,
    loading,
    setAlert,
    closeAlert,

} = globalStateSlice.actions

export const globalStateReducer = (state: RootState) => state?.globalState || null

export default globalStateSlice.reducer