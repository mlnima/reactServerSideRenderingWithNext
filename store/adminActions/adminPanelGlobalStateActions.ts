import * as types from "../types";
import axios, {AxiosResponse} from "axios";
import {NextRouter} from 'next/router'
import {PageTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

export const getCustomPages = ( ) => async (dispatch: any) => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/getPagesData', {token: localStorage.wt}).then((res:AxiosResponse<unknown|any>) => {
        if (res.data?.pages) {
            dispatch({
                type: types.GET_CUSTOM_PAGES,
                payload: res.data.pages.map((page:PageTypes) => page.pageName)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}

export const clearCaches = ( router:NextRouter ) => async (dispatch: any) => {
    dispatch({
        type:types.LOADING,
        payload:true
    })
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/clearCaches?token=${localStorage.wt}`).then((res:AxiosResponse<unknown|any>)=>{
        dispatch({
            type:types.LOADING,
            payload:false
        })

        dispatch({
            type: types.SET_ALERT,
            payload: {

                message: res.data.message || 'done',
                type: 'success'
            }
        }) ;
        setTimeout(()=>router.reload(),1000)
    }).catch(err=>{
        dispatch({
            type:types.LOADING,
            payload:false
        })
        dispatch({
            type: types.SET_ALERT,
            payload: {
                message: 'Error While Deleting Cache',
                type: 'error',
                err
            }
        })

    })
}

export const setSidebarStatus = ( status:boolean ) => async (dispatch: any) => {
    dispatch({
        type:types.SET_SIDEBAR_STATUS,
        payload:status
    })
}

