import {reduceWidgetsToGroups} from "custom-util";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import Axios from "@_variables/Axios";
import {AxiosResponse} from "axios";
import {loading, setAlert} from "../clientReducers/globalStateReducer";
import {Widget} from "typescript-types";
import getWidgets from "api-requests/src/dashboard/widgets/getWidgets";
import updateWidget from "api-requests/src/dashboard/widgets/updateWidget";
import createNewWidget from "api-requests/src/dashboard/widgets/createNewWidget";
import deleteWidget from "api-requests/src/dashboard/widgets/deleteWidget";

const initialState = {
    adminPanelWidgets: {}
}

// export const adminPanelWidgetsReducer = (state: AdminPanelWidgetsTypes = initialState, action: { type: string, payload: any }) => {
//     switch (action.type) {
//         case ADMIN_PANEL_GET_WIDGETS:
//             return {
//                 ...state,
//                 adminPanelWidgets: {...reduceWidgetsToGroups(action?.payload)}
//             };
//         case SAVE_NEW_WIDGET:
//             return {
//                 ...state,
//                 adminPanelWidgets:{
//                    ...state.adminPanelWidgets,
//                     [action.payload?.data?.position] : [
//                         ...state.adminPanelWidgets?.[action.payload?.data?.position],
//                         action.payload
//                     ]
//                 }
//             };
//             //[...state.widgets, action.payload]
//         case UPDATE_WIDGET:
//
//
//             return {
//                 ...state,
//
//             };
//         case ADMIN_PANEL_DELETE_WIDGET:
//             return {
//                 ...state,
//                 adminPanelWidgets: {
//                     ...state.adminPanelWidgets,
//                     [action.payload?.position]: state.adminPanelWidgets?.[action.payload?.position]
//                         ?.filter(widget=> widget._id !== action.payload._id),
//                 }
//             };
//         default:
//             return state
//     }
// }

// export const fetchAdminGetWidgets = createAsyncThunk(
//     'adminPanelWidgets/fetchAdminWidgets',
//     async ({router}: { router?: NextRouter }, thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//         return await Axios.get(`/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
//         .then((res: AxiosResponse<unknown | any>) => {
//             console.log(res?.data?.widgets)
//             thunkAPI.dispatch(setRealTimeWidgetsForAdmin( reduceWidgetsToGroups(res?.data?.widgets || [])))
//         }).catch(err => {
//                 thunkAPI.dispatch(setAlert({
//                     message: 'Error While Getting Widgets',
//                     type: 'error',
//                     err
//                 }))
//         }).finally(()=>thunkAPI.dispatch(loading(false)))
//     }
// )


export const fetchAdminPanelGetWidgets = createAsyncThunk(
    'adminPanelWidgets/fetchAdminWidgets',
    async (data: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getWidgets()
            .then((res: AxiosResponse<unknown | any>) => {
                return reduceWidgetsToGroups(res?.data?.widgets || [])
            }).catch(err => {
                thunkAPI.dispatch(setAlert({
                    message: 'Error While Getting Widgets',
                    type: 'error',
                    err
                }))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const fetchAdminPanelUpdateWidget = createAsyncThunk(
    'adminPanelWidgets/fetchAdminPanelUpdateWidget',
    async (widgetData: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
       return await updateWidget(widgetData)
            .then((res:AxiosResponse<unknown|any>)=>{

            }).catch(err=>{
                console.log(err)
            }).finally(()=> {
               thunkAPI.dispatch(loading(false))
           })
    }
)


export const fetchAdminPanelAddNewWidget = createAsyncThunk(
    'adminPanelWidgets/adminPanelAddNewWidget',
    async (newWidgetData: Widget, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await createNewWidget(newWidgetData)
            .then((res: AxiosResponse<unknown | any>) => {
                if (res.data?.newWidgetData) {
                    thunkAPI.dispatch(setAlert({
                        message: 'WidgetWrapper Created',
                        type: 'success',
                    }))
                    return res.data?.newWidgetData
                }
            }).catch(err => {
                thunkAPI.dispatch(setAlert({
                    message: 'Error While Creating New WidgetWrapper',
                    type: 'error',
                    err
                }))
            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelDeleteWidget = createAsyncThunk(
    'adminPanelWidgets/fetchAdminPanelDeleteWidget',
    async ({_id, position}: { _id: string, position: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await deleteWidget(_id)
            .then((res: AxiosResponse<unknown | any>) => {
            thunkAPI.dispatch(setAlert({
                message: 'WidgetWrapper Deleted',
                type: 'success',
            }))
            return {_id, position}
        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: 'Error While Deleting WidgetWrapper', type: 'error', err}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)





export const adminPanelWidgetsSlice = createSlice({
    name: 'adminPanelWidgets',
    initialState,
    reducers: {
        // setSidebarStatus:(state, action: PayloadAction<any>) =>{
        //     state.sidebar = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminPanelGetWidgets.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    //adminPanelWidgets: !!action?.payload && {...reduceWidgetsToGroups(action?.payload)},
                    adminPanelWidgets: action?.payload,
                };
            })
            .addCase(fetchAdminPanelAddNewWidget.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    adminPanelWidgets: {
                        ...(state.adminPanelWidgets || {}),
                        [action.payload?.data?.position]: [
                            ...(state.adminPanelWidgets?.[action.payload?.data?.position] || []),
                            action.payload
                        ]
                    }
                };
            })
    }
})


export const adminPanelWidgetsReducer = (state: RootState) => state?.adminPanelWidgets || null

export default adminPanelWidgetsSlice.reducer