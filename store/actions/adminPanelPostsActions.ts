import * as types from "../types";
import axios from "axios";


export const adminGetPost = (_id?: string | string[]) =>async (dispatch: any) =>{
    if (_id){
        await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}` ).then(res=>{
            dispatch({
                type:types.ADMIN_GET_POST,
                // @ts-ignore
                payload:res.data?.post
            })
        }).catch(err=>{
            dispatch({
                type: types.SET_ALERT,
                payload: {message:err.response.data.message,type:'Error'}
            })
        })
    }else {
        dispatch({
            type:types.ADMIN_GET_POST,
            payload:{}
        })
    }
}
export const adminUpdatePost = (data?: object) =>async (dispatch: any) =>{
    const body = {
        postData: data,
        token: localStorage.wt
    }
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL  + `/api/admin/posts/updatePost`, body).then(res=>{
        dispatch({
            type: types.SET_ALERT,
            // @ts-ignore
            payload: {message: res.data.message || 'Post Updated' ,type:'success'}
        })
        dispatch({
            type: types.LOADING,
            payload: false
        })
    }).catch(err=>{
        dispatch({
            type: types.SET_ALERT,
            payload: {message:err.response.data.message,type:'Error'}
        })
        dispatch({
            type: types.LOADING,
            payload: false
        })
    })
}

export const adminEditPost = (data?:object) =>(dispatch: any)=>{
    dispatch({
        type:types.ADMIN_EDIT_POST,
        payload: {...data}
    })
}

export const adminChangeActiveEditingLanguage = (language:string) => (dispatch: any)=>{

    dispatch({
        type:types.CHANGE_ACTIVE_EDITING_LANGUAGE,
        payload: language
    })
}

export const adminNewPost = ( ) => (dispatch: any)=>{
    dispatch({
        type:types.NEW_POST,
        payload: ''
    })
}