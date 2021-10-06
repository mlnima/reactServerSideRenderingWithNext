import * as types from "../types";
import {HYDRATE} from 'next-redux-wrapper';

export const setLoginRegisterFormStatus = (statusType) => dispatch => {
    dispatch({
        type:types.LOGIN_REGISTER_FORM,
        payload:statusType
    })
}

export const setLoading = (statusType) => dispatch => {
    dispatch({
        type:types.LOADING,
        payload:statusType
    })
}

export const checkRouteAndSetLoading = (path,nextPath) => dispatch => {
    if (path !== nextPath){
        dispatch({
            type:types.CHECK_ROUTE_AND_SET_LOADING,
            payload:true
        })
    }
}

export const hydrateGlobalState = (data) => dispatch => {
    dispatch({
        type:HYDRATE,
        payload:data
    })
}