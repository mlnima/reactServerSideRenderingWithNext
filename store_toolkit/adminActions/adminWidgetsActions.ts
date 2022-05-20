// import axios, {AxiosResponse} from "axios";
// import {WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";
// import {SET_WIDGETS_IN_GROUPS, LOADING, SET_ALERT} from "../types";
// import {ADMIN_PANEL_GET_WIDGETS, ADMIN_PANEL_DELETE_WIDGET, SAVE_NEW_WIDGET, UPDATE_WIDGET} from "../adminTypes";
// import Axios from "@_variables/util/Axios";
// import {AnyAction} from "redux";
// //@ts-ignore
// export const adminGetWidgets = ():AnyAction => async (dispatch: any) => {
//     dispatch({type: LOADING, payload: true})
//     await Axios.get(`/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
//         .then((res: AxiosResponse<unknown | any>) => {
//             dispatch({
//                 type:SET_WIDGETS_IN_GROUPS,
//                 payload:res.data.widgets
//             })
//             dispatch({
//                 type: LOADING,
//                 payload: false
//             })
//         }).catch(err => {
//             dispatch({
//                 type: LOADING,
//                 payload: false
//             })
//             dispatch({
//                 type: SET_ALERT,
//                 payload: {
//                     message: 'Error While Getting Widgets',
//                     type: 'error',
//                     err
//                 }
//             })
//         })
// }
// //@ts-ignore
// export const adminPanelGetWidgets = ():AnyAction => async (dispatch: any) => {
//     dispatch({type: LOADING, payload: true})
//     await Axios.get( `/api/admin/widgets/adminPanelGetWidgets?token=${localStorage.wt}`)
//         .then((res: AxiosResponse<unknown | any>) => {
//             dispatch({
//                 type:ADMIN_PANEL_GET_WIDGETS,
//                 payload:res.data.widgets
//             })
//         }).catch(err => {
//             dispatch({
//                 type: SET_ALERT,
//                 payload: {
//                     message: 'Error While Getting Widgets',
//                     type: 'error',
//                     err
//                 }
//             })
//         }).finally(()=>{
//             dispatch({
//                 type: LOADING,
//                 payload: false
//             })
//         })
// }
//
// //@ts-ignore
// export const adminAddNewWidget = (newWidgetData: WidgetPropTypes):AnyAction => async (dispatch: any) => {
//     dispatch({type: LOADING, payload: true})
//     await Axios.post('/api/admin/widgets/adminAddNewWidget', {data: newWidgetData, token: localStorage.wt})
//         .then((res: AxiosResponse<unknown | any>) => {
//             if (res.data?.newWidgetData) {
//                 dispatch({
//                     type: SAVE_NEW_WIDGET,
//                     payload: res.data?.newWidgetData
//                 })
//                 dispatch({
//                     type: SET_ALERT,
//                     payload: {
//                         message: 'Widget Created',
//                         type: 'success',
//                     }
//                 })
//             }
//         }).catch(err => {
//             dispatch({
//                 type: SET_ALERT,
//                 payload: {
//                     message: 'Error While Creating New Widget',
//                     type: 'error',
//                     err
//                 }
//             })
//         }).finally(()=>{
//             dispatch({
//                 type: LOADING,
//                 payload: false
//             })
//         })
// }
//
// //@ts-ignore
// export const adminDeleteWidget = (_id:string,position):AnyAction => async (dispatch: any) => {
//     dispatch({type: LOADING, payload: true})
//     await Axios.post( '/api/admin/widgets/adminDeleteWidget', {_id,token: localStorage.wt}).then((res:AxiosResponse<unknown|any>)=>{
//         dispatch({
//             type: ADMIN_PANEL_DELETE_WIDGET,
//             payload: {_id,position}
//         })
//         dispatch({
//             type: SET_ALERT,
//             payload: {
//                 message: 'Widget Deleted',
//                 type: 'success',
//             }
//         })
//     }).catch(err=>{
//         dispatch({
//             type: SET_ALERT,
//             payload: {
//                 message: 'Error While Deleting Widget',
//                 type: 'error',
//                 err
//             }
//         })
//     }).finally(()=>{
//         dispatch({
//             type: LOADING,
//             payload: false
//         })
//     })
// }
//
// //@ts-ignore
// export const adminUpdateWidget = (widgetData:WidgetPropTypes):AnyAction => async (dispatch: any) => {
//     dispatch({type: LOADING, payload: true})
//     await Axios.post(
//         '/api/admin/widgets/adminUpdateWidget',
//         {widgetData,token: localStorage.wt})
//         .then((res:AxiosResponse<unknown|any>)=>{
//         if (res.data?.updatedWidget){
//             dispatch({
//                 type: UPDATE_WIDGET,
//                 payload: res.data?.updatedWidget
//             })
//             // dispatch({
//             //     type: SET_ALERT,
//             //     payload: {
//             //         message: 'Widget Updated',
//             //         type: 'success',
//             //     }
//             // })
//         }
//     }).catch(err=>{
//         console.log(err)
//     }).finally(()=>{
//             dispatch({
//                 type: LOADING,
//                 payload: false
//             })
//         })
// }