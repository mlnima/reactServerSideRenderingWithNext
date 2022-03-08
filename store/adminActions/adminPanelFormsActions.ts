import {ADMIN_GET_FORMS, ADMIN_GET_FORM} from "@store/adminTypes";
import {LOADING} from "@store/types";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";

export const adminGetForms = (data) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
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

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}