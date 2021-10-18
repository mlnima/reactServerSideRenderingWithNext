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

export const setAlert = (payload) => dispatch => {
    dispatch({
        type:types.SET_ALERT,
        payload
    })

    setTimeout(()=>{
        dispatch({
            type:types.SET_ALERT,
            payload:{
                active:false,
                type:null,
                message:''
            }
        })
    },8000)
}
export const closeAlert = ( ) => dispatch => {
    dispatch({
        type:types.CLOSE_ALERT,
        payload:null
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