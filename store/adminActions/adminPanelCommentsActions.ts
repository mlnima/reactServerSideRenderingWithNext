import {AxiosResponse, AxiosError} from "axios";
import Axios from "@_variables/util/Axios";
import {
    ADMIN_GET_COMMENTS,
    ADMIN_GET_COMMENT,
    ADMIN_DELETE_COMMENT,
    ADMIN_EDIT_COMMENT, ADMIN_GET_POST,
} from "../adminTypes";
import {DELETE_COMMENT, LOADING, SET_ALERT} from "@store/types";
import {AnyAction} from "redux";

//@ts-ignore
export const adminGetComments = (data):AnyAction => async (dispatch) =>{
    dispatch({type: LOADING, payload: true})
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

    }).finally(()=>dispatch({type: LOADING, payload: false}))


}

//@ts-ignore
export const adminDeleteComments = (commentsIds):AnyAction => async dispatch => {
    dispatch({type: LOADING, payload: true})
    await Axios.post(`/api/admin/posts/deleteComments`, {
        commentsIds: commentsIds,
        token: localStorage.wt
    }).then((res) => {
        dispatch({
            type: SET_ALERT,
            payload: {
                message: res.data.message || 'Comment Deleted',
                type: 'success'
            }
        });
    }).catch(err => {
        dispatch({
            type: SET_ALERT,
            payload: {
                message: 'Error While Deleting Comment',
                type: 'error',
                err
            }
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))
}
//@ts-ignore
export const adminGetComment = (_id?: string | string[]):AnyAction => async dispatch =>{

}