import {HYDRATE} from 'next-redux-wrapper';
import {CHECK_ROUTE_AND_SET_LOADING, CLOSE_ALERT, LOADING, LOGIN_REGISTER_FORM, SET_ALERT} from "@store/types";

export const setLoginRegisterFormStatus = (statusType) => dispatch => {
    dispatch({
        type:LOGIN_REGISTER_FORM,
        payload:statusType
    })
}

export const setLoading = (statusType ) => dispatch => {
    dispatch({
        type:LOADING,
        payload:statusType
    })
}

export const setAlert = (payload) => dispatch => {
    dispatch({
        type:SET_ALERT,
        payload
    })

    setTimeout(()=>{
        dispatch({
            type:SET_ALERT,
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
        type:CLOSE_ALERT,
        payload:null
    })
}

export const checkRouteAndSetLoading = (path,nextPath) => dispatch => {
    if (path !== nextPath){
        dispatch({
            type:CHECK_ROUTE_AND_SET_LOADING,
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