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

export const hydrateGlobalState = (data) => dispatch => {
    dispatch({
        type:HYDRATE,
        payload:data
    })
}