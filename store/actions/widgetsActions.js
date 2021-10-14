import * as types from "../types";
import {HYDRATE} from "next-redux-wrapper";
import axios from "axios";
import {DELETE_WIDGET} from "../types";

export const setWidgets = widgets => async dispatch => {
    dispatch(
        {
            type: types.SET_WIDGETS,
            payload: widgets
        }
    )
}

export const setWidgetsForAdmin = widgets => async dispatch => {
    dispatch(
        {
            type: types.SET_WIDGETS_FOR_ADMIN,
            payload: widgets
        }
    )
}

export const addNewWidget = newWidgetData => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/addNewWidget', {data:newWidgetData,token: localStorage.wt}).then(res=>{
        if (res.data?.newWidgetData){

            dispatch({
                type: types.SAVE_NEW_WIDGET,
                payload: res.data?.newWidgetData
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}

export const updateWidget = widgetData => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/updateWidget', {widgetData,token: localStorage.wt}).then(res=>{
        if (res.data?.updatedWidget){

            dispatch({
                type: types.UPDATE_WIDGET,
                payload: res.data?.updatedWidget
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}

export const deleteWidget = _id => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/deleteWidget', {_id,token: localStorage.wt}).then(res=>{
        dispatch({
            type: types.DELETE_WIDGET,
            payload: _id
        })
    }).catch(err=>{
        console.log(err)
    })
}




export const hydrateWidgets = data => dispatch => {

    dispatch(
        {
            type: HYDRATE,
            payload: data
        }
    )
}
