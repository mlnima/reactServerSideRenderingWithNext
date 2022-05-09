import axios, {AxiosResponse} from "axios";
import {NextRouter} from 'next/router'
import {PageTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {GET_CUSTOM_PAGES, SET_SIDEBAR_STATUS} from "@store/adminTypes";
import {CLEAR_REQUESTED_WIDGETS, LOADING, SET_ALERT, SET_REQUESTED_WIDGETS} from "../types";
import {AnyAction} from "redux";
//@ts-ignore
export const getCustomPages = ():AnyAction => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/getPagesData', {token: localStorage.wt}).then((res: AxiosResponse<unknown | any>) => {
        if (res.data?.pages) {
            dispatch({
                type: GET_CUSTOM_PAGES,
                payload: res.data.pages.map((page: PageTypes) => page.pageName)
            })
        }
    }).catch(err => {
        console.log(err)
    })
}
//@ts-ignore
export const clearCaches = (router?: NextRouter):AnyAction => async dispatch => {
    dispatch({type: LOADING, payload: true})
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/clearCaches?token=${localStorage.wt}`).then((res: AxiosResponse<unknown | any>) => {
        dispatch({
            type: SET_ALERT,
            payload: {
                message: res.data.message || 'done',
                type: 'success'
            }
        });
        dispatch({
            type:CLEAR_REQUESTED_WIDGETS ,
            payload:[]
        })
        setTimeout(() => router.reload(), 1000)
    }).catch(err => {
        dispatch({
            type: SET_ALERT,
            payload: {
                message: 'Error While Deleting Cache',
                type: 'error',
                err
            }
        })
    }).catch(err => {

    }).finally(() => dispatch({type: LOADING, payload: false}))
}

//@ts-ignore
export const setSidebarStatus = (status:boolean):AnyAction => (dispatch) => {
    dispatch({
        type: SET_SIDEBAR_STATUS,
        payload: status
    })
}

//@ts-ignore
export const reloadPageDataByAddingQuery = (query, push, pathname):AnyAction => dispatch => {
    push({
        pathname: pathname,
        query: {...query, lastPageUpdate: Date.now()}
    })
}


