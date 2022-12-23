import {reduceWidgetsToGroups} from "custom-util";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AxiosError, AxiosResponse} from "axios";
import {AxiosInstance} from "api-requests";
import {loading, setAlert} from "./globalStateReducer";
import {Widget} from "typescript-types";

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
        return await AxiosInstance.get(`/api/admin/widgets/adminPanelGetWidgets?token=${localStorage.wt}`)
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
export const fetchAdminPanelUpdateWidget = createAsyncThunk(
    'adminPanelWidgets/fetchAdminPanelUpdateWidget',
    async (widgetData: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
       return  await AxiosInstance.post(
            '/api/admin/widgets/adminUpdateWidget',
            {widgetData,token: localStorage.wt})
            .then((res:AxiosResponse<unknown|any>)=>{
                if (res.data?.updatedWidget){
                    // dispatch({
                    //     type: UPDATE_WIDGET,
                    //     payload: res.data?.updatedWidget
                    // })

                }
            }).catch((error: AxiosError)=>{
                console.log(error)
            }).finally(()=> {
               thunkAPI.dispatch(loading(false))
           })
    }
)


export const fetchAdminPanelAddNewWidget = createAsyncThunk(
    'adminPanelWidgets/adminPanelAddNewWidget',
    async (newWidgetData: Widget, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await AxiosInstance.post('/api/admin/widgets/adminAddNewWidget', {data: newWidgetData, token: localStorage.wt})
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

export const fetchAdminPanelDeleteWidget = createAsyncThunk(
    'adminPanelWidgets/fetchAdminPanelDeleteWidget',
    async ({_id, position}: { _id: string, position: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await AxiosInstance.post('/api/admin/widgets/adminDeleteWidget', {
            _id,
            token: localStorage.wt
        }).then((res: AxiosResponse<unknown | any>) => {

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