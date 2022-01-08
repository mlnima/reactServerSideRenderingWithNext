import * as types from "../types";
import * as adminTypes from "../types";
import axios, {AxiosResponse} from "axios";
import {WidgetPropTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

export const adminGetWidgets = () => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/widgets/adminGetWidgets?token=${localStorage.wt}`)
        .then((res: AxiosResponse<unknown | any>) => {
            dispatch({
                type: types.SET_WIDGETS_FOR_ADMIN,
                payload: res.data.widgets
            })
            dispatch({
                type: types.LOADING,
                payload: false
            })
        }).catch(err => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
            dispatch({
                type: types.SET_ALERT,
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
                    type: adminTypes.SAVE_NEW_WIDGET,
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
            type: adminTypes.DELETE_WIDGET,
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
                type: adminTypes.UPDATE_WIDGET,
                payload: res.data?.updatedWidget
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}