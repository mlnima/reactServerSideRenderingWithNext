import {ADMIN_GET_FORMS, ADMIN_GET_FORM} from "@store/adminTypes";
import {LOADING, SET_ALERT} from "@store/types";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {AnyAction} from "redux";
//@ts-ignore
export const adminGetForms = (data):AnyAction => async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        ...data,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/forms/getFormsData',body).then((response:AxiosResponse)=>{

        dispatch({
            type: ADMIN_GET_FORMS,
            payload: response.data?.forms
        })
    }).catch((err:AxiosError)=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}
//@ts-ignore
export const adminGetForm = (_id):AnyAction => async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        _id,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/forms/getFormData',body).then((response:AxiosResponse)=>{
        dispatch({
            type: ADMIN_GET_FORM,
            payload: response.data?.form
        })
    }).catch((err:AxiosError)=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}
//@ts-ignore
export const adminDeleteForm = (_id):AnyAction => async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        _id,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/forms/deleteFormData',body).then((response:AxiosResponse)=>{
        dispatch({
            type: SET_ALERT,
            payload: {
                message: 'Deleted',
                type: 'success',
            }
        })
    }).catch((err:AxiosError)=>{
        dispatch({
            type: SET_ALERT,
            payload: {
                message: 'Error While Deleting Form',
                type: 'error',
                err
            }
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}