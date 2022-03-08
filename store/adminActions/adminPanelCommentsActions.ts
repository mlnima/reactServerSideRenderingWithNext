import {AxiosResponse, AxiosError} from "axios";
import Axios from "@_variables/util/Axios";
import {
    ADMIN_GET_COMMENTS,
    ADMIN_GET_COMMENT,
    ADMIN_DELETE_COMMENT,
    ADMIN_EDIT_COMMENT, ADMIN_GET_POST,
} from "../adminTypes";
import {LOADING} from "@store/types";

export const adminGetComments = (data) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        ...data,
        token: localStorage.wt
    };

    await Axios.post('/api/admin/posts/getComments',body).then((response:AxiosResponse)=>{
        dispatch({
            type: ADMIN_GET_COMMENTS,
            payload: response.data?.comments
        })
    }).catch((err:AxiosError)=>{

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })


}

export const adminGetComment = (_id?: string | string[]) => async (dispatch: any) =>{

}