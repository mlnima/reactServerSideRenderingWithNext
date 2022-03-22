import {ADMIN_GET_FORMS, ADMIN_GET_FORM} from "@store/adminTypes";
import {LOADING, SET_ALERT} from "@store/types";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";

export const adminGetForms = (data) => async (dispatch: any) =>{
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

export const adminGetForm = (_id) => async (dispatch: any) =>{
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

export const adminDeleteForm = (_id) => async (dispatch: any) =>{
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