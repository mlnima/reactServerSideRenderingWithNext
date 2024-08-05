// @ts-nocheck
import {reduceWidgetsToGroups} from "@repo/shared-util";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AxiosError, AxiosResponse} from "axios";
import {loading, setAlert} from "./globalStateReducer";
import {Widget} from "@repo/typescript-types";
import {
    dashboardAPIRequestGetWidgets,
    dashboardAPIRequestUpdateWidget,
    dashboardAPIRequestCreateNewWidget,
    dashboardAPIRequestDeleteWidget
} from "@repo/api-requests";

const initialState = {
    adminPanelWidgets: {}
}

export const getWidgetsAction = createAsyncThunk(
    'adminPanelWidgets/getWidgetsAction',
    async (data: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestGetWidgets()
            .then((res: AxiosResponse<unknown | any>) => {
                return reduceWidgetsToGroups(res?.data?.widgets || [])
            }).catch((error: AxiosError) => {
                thunkAPI.dispatch(setAlert({
                    message: 'Error While Getting Widgets',
                    type: 'error',
                    err:error
                }))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const updateWidgetAction = createAsyncThunk(
    'adminPanelWidgets/fetchAdminPanelUpdateWidget',
    async (widgetData: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestUpdateWidget(widgetData)
            .then((res:AxiosResponse<unknown|any>)=>{

            }).catch((error: AxiosError)=>{
                console.log(error)
            }).finally(()=> {
               thunkAPI.dispatch(loading(false))
           })
    }
)


export const createNewWidgetAction = createAsyncThunk(
    'adminPanelWidgets/createNewWidgetAction',
    async (newWidgetData: Widget, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestCreateNewWidget(newWidgetData)
            .then((res: AxiosResponse<unknown | any>) => {
                if (res.data?.newWidgetData) {
                    thunkAPI.dispatch(setAlert({
                        message: 'WidgetWrapper Created',
                        type: 'success',
                    }))

                    return res.data?.newWidgetData
                }
            }).catch((error: AxiosError) => {
                thunkAPI.dispatch(setAlert({
                    message: 'Error While Creating New WidgetWrapper',
                    type: 'error',
                    err:error
                }))
            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const deleteWidgetAction = createAsyncThunk(
    'adminPanelWidgets/deleteWidgetAction',
    async ({_id, position}: { _id: string, position: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await dashboardAPIRequestDeleteWidget(_id)
            .then((res: AxiosResponse<unknown | any>) => {
            thunkAPI.dispatch(setAlert({
                message: 'WidgetWrapper Deleted',
                type: 'success',
            }))
            return {_id, position}
        }).catch((error: AxiosError) => {
            thunkAPI.dispatch(setAlert({message: 'Error While Deleting WidgetWrapper', type: 'error', err:error}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)





export const widgetsSlice = createSlice({
    name: 'adminPanelWidgets',
    initialState,
    reducers: {
        // setSidebarStatus:(state, action: PayloadAction<any>) =>{
        //     state.sidebar = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWidgetsAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    //adminPanelWidgets: !!action?.payload && {...reduceWidgetsToGroups(action?.payload)},
                    adminPanelWidgets: action?.payload,
                };
            })
            .addCase(createNewWidgetAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    adminPanelWidgets: {
                        ...(state.adminPanelWidgets || {}),
                        [action.payload?.data?.position]: [
                            //@ts-ignore
                            ...(state.adminPanelWidgets?.[action.payload?.data?.position] || []),
                            action.payload
                        ]
                    }
                };
            })
    }
})


export const adminPanelWidgetsReducer = (state: RootState) => state?.widgets || null

export default widgetsSlice.reducer