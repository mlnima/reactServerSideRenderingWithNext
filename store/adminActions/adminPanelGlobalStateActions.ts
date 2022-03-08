import axios, {AxiosResponse} from "axios";
import {NextRouter} from 'next/router'
import {PageTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {GET_CUSTOM_PAGES, SET_SIDEBAR_STATUS} from "@store/adminTypes";
import {LOADING, SET_ALERT} from "../types";

export const getCustomPages = () => async (dispatch: any) => {
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

export const clearCaches = (router: NextRouter) => async (dispatch: any) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/clearCaches?token=${localStorage.wt}`).then((res: AxiosResponse<unknown | any>) => {
        dispatch({
            type: SET_ALERT,
            payload: {

                message: res.data.message || 'done',
                type: 'success'
            }
        });
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
    }).catch(() => {
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}

export const setSidebarStatus = (status: boolean) => async (dispatch: any) => {
    dispatch({
        type: SET_SIDEBAR_STATUS,
        payload: status
    })
}

export const reloadPageDataByAddingQuery = (query, push, pathname) => () => {
    push({
        pathname: pathname,
        query: {...query, lastPageUpdate: Date.now()}
    })
}


