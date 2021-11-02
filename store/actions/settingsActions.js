import * as types from "../types";
import axios from "axios";

export const setSettings = (setting) => dispatch=>{
    dispatch({
        type:types.SET_SETTINGS,
        payload: setting
    })
}

export const updateSetting = (type, data) => async dispatch=>{
    const body = {
        type,
        data,
        token: localStorage.wt,
    };
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/settings/update', body).then(res=>{
        dispatch({
            type: types.SET_ALERT,
            payload: {message:'updated',type:'success'}
        })
        dispatch({
            type:types.LOADING,
            payload:false
        })
    }).catch(err=>{
        dispatch({
            type: types.SET_ALERT,
            payload: {message:'Something Went Wrong',type:'error',err}
        })
    })
}


export const editDesign = ( e ) => async dispatch => {
    dispatch({
        type:types.EDIT_DESIGN,
        payload:{
            [e.target.name]: e.target.value
        }
    })
}


