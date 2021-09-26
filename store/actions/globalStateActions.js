import * as types from "../types";

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