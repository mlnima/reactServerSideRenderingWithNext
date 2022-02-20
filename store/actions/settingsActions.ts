import * as types from "../types";
import * as adminTypes from "../types";
import { ChangeEvent } from "react";
import axios, {AxiosResponse} from "axios";

export const setSettings = (setting:any) => (dispatch:any)=>{
    dispatch({
        type:types.SET_SETTINGS,
        payload: setting
    })
}

export const updateSetting = (type : any, data :object) => async (dispatch:any)=>{
    dispatch({
        type:types.LOADING,
        payload:true
    })
    const body = {
        type,
        data,
        token: localStorage.wt,
    };
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/settings/update', body).then((res: AxiosResponse<any>)=>{
        dispatch({
            type: types.SET_ALERT,
            payload: {message: res.data.message || 'updated' ,type:'success'}
        })
    }).catch(err=>{
        dispatch({
            type: types.SET_ALERT,
            payload: {message: err.response.data.message || 'Something Went Wrong',type:'error',err}
        })
    }).finally(()=>{
        dispatch({
            type:types.LOADING,
            payload:false
        })
    })
}


export const editDesign = ( e :ChangeEvent<any>) => async (dispatch:any) => {
    dispatch({
        type:adminTypes.EDIT_DESIGN,
        payload:{
            [e.target.name]: e.target.value
        }
    })
}



