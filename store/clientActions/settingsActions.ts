import {ChangeEvent} from "react";
import axios, {AxiosResponse} from "axios";
import {GET_SETTINGS, LOADING, SET_ALERT, SET_SETTINGS} from "../types";
import {EDIT_DESIGN} from "@store/adminTypes";
// import staticDataJson from '../../static/jsons/staticData.json'

export const setSettings = (setting: any) => (dispatch: any) => {
    dispatch({
        type: SET_SETTINGS,
        payload: setting
    })
}

export const updateSetting = (type: any, data: object) => async (dispatch: any) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        type,
        data,
        token: localStorage.wt,
    };
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/settings/update', body).then((res: AxiosResponse<any>) => {
        dispatch({
            type: SET_ALERT,
            payload: {message: res.data.message || 'updated', type: 'success'}
        })
    }).catch(err => {
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response.data.message || 'Something Went Wrong', type: 'error', err}
        })
    }).finally(() => {
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}


export const editDesign = (e: ChangeEvent<any>) => async (dispatch: any) => {
    dispatch({
        type: EDIT_DESIGN,
        payload: {
            [e.target.name]: e.target.value
        }
    })
}


// export const getSettings = (userAgent, ip) => (dispatch: any) => {
//
//     dispatch({
//         type: GET_SETTINGS,
//         payload: {
//             design: staticDataJson?.design || {},
//             identity: staticDataJson?.identity || {},
//             eCommerce: {},
//             ip,
//             isMobile: Boolean(userAgent.match(
//                 /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
//             ))
//         }
//     })
// }

