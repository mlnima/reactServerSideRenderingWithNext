import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import Axios from "@_variables/Axios";
import deleteCommentByAdmin from "api-requests/src/client/comments/deleteCommentByAdmin";

export const deleteCommentByAdminInPostPageAction = createAsyncThunk(
    'posts/deleteCommentByAdminInPostPageAction',
    async (commentsListToDelete: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await deleteCommentByAdmin(commentsListToDelete).then((res) => {
            thunkAPI.dispatch(setAlert({
                message: res.data.message || 'Comment Deleted',
                type: 'success'
            }))
            return commentsListToDelete

        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                message: 'Error While Deleting Comment',
                type: 'error',
                err
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default deleteCommentByAdminInPostPageAction