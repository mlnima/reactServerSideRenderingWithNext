import * as types from "../types";
import axios, {AxiosResponse} from "axios";
import {WidgetPropTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

// export const setWidgets = (widgets:WidgetPropTypes[]) => async (dispatch: any) => {
//     dispatch( {
//             type: types.SET_WIDGETS,
//             payload: widgets
//         } )
// }

// export const setWidgetsForAdmin = (widgets:WidgetPropTypes[]) => async (dispatch: any) => {
//     dispatch( {
//             type: types.SET_WIDGETS_FOR_ADMIN,
//             payload: widgets
//         } )
// }



// export const updateWidget = (widgetData:WidgetPropTypes) => async (dispatch: any) => {
//     await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/updateWidget', {widgetData,token: localStorage.wt}).then((res:AxiosResponse<unknown|any>)=>{
//         if (res.data?.updatedWidget){
//
//             dispatch({
//                 type: types.UPDATE_WIDGET,
//                 payload: res.data?.updatedWidget
//             })
//         }
//     }).catch(err=>{
//         console.log(err)
//     })
// }

// export const deleteWidget = (_id:string) => async (dispatch: any) => {
//     await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/deleteWidget', {_id,token: localStorage.wt}).then(res=>{
//         dispatch({
//             type: types.DELETE_WIDGET,
//             payload: _id
//         })
//     }).catch(err=>{
//         console.log(err)
//     })
// }



//
// export const hydrateWidgets = data => (dispatch: any) => {
//
//     dispatch(
//         {
//             type: HYDRATE,
//             payload: data
//         }
//     )
// }
