import axios, {AxiosResponse} from "axios";
import {WidgetPropTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {SET_WIDGETS_IN_GROUPS, LOADING, SET_ALERT} from "../types";
import {DELETE_WIDGET, SAVE_NEW_WIDGET, UPDATE_WIDGET} from "../adminTypes";

export const adminGetWidgets = () => async (dispatch: any) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
        .then((res: AxiosResponse<unknown | any>) => {
            dispatch({
                type:SET_WIDGETS_IN_GROUPS,
                payload:res.data.widgets
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING,
                payload: false
            })
            dispatch({
                type: SET_ALERT,
                payload: {
                    message: 'Error While Getting Widgets',
                    type: 'error',
                    err
                }
            })
        })
}

export const adminAddNewWidget = (newWidgetData: WidgetPropTypes) => async (dispatch: any) => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/adminAddNewWidget', {data: newWidgetData, token: localStorage.wt})
        .then((res: AxiosResponse<unknown | any>) => {
            if (res.data?.newWidgetData) {
                dispatch({
                    type: SAVE_NEW_WIDGET,
                    payload: res.data?.newWidgetData
                })
            }
        }).catch(err => {
            console.log(err)
        })
}

export const adminDeleteWidget = (_id:string) => async (dispatch: any) => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/adminDeleteWidget', {_id,token: localStorage.wt}).then((res:AxiosResponse<unknown|any>)=>{
        dispatch({
            type: DELETE_WIDGET,
            payload: _id
        })
    }).catch(err=>{
        console.log(err)
    })
}

export const adminUpdateWidget = (widgetData:WidgetPropTypes) => async (dispatch: any) => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/adminUpdateWidget', {widgetData,token: localStorage.wt}).then((res:AxiosResponse<unknown|any>)=>{
        if (res.data?.updatedWidget){

            dispatch({
                type: UPDATE_WIDGET,
                payload: res.data?.updatedWidget
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}