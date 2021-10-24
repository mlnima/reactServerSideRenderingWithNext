import * as types from "../types";
import axios from "axios";

export const getCustomPages = ( ) => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/getPagesData', {token: localStorage.wt}).then(res => {
        if (res.data?.pages) {
            dispatch({
                type: types.GET_CUSTOM_PAGES,
                payload: res.data.pages.map(page => page.pageName)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}

export const clearCaches = ( router ) => async dispatch => {
    dispatch({
        type:types.LOADING,
        payload:true
    })
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/clearCaches?token=${localStorage.wt}`).then(res=>{
        dispatch({
            type:types.LOADING,
            payload:false
        })
        dispatch({
            type: types.SET_ALERT,
            payload: {message: res.data.message, type: 'success'}
        })
        setTimeout(()=>router.reload(),1000)
    }).catch(err=>{
        dispatch({
            type:types.LOADING,
            payload:false
        })
        dispatch({
            type: types.SET_ALERT,
            payload: {message: 'Error While Deleting Cache', type: 'success',err}
        })

    })
}

export const setSidebarStatus = ( status ) => async dispatch => {
    dispatch({
        type:types.SET_SIDEBAR_STATUS,
        payload:status
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
