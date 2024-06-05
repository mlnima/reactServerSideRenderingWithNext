import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import {clientAPIRequestDeleteCommentByAdmin} from "@repo/api-requests";

export const deleteCommentByAdminInPostPageAction = createAsyncThunk(
    'posts/deleteCommentByAdminInPostPageAction',
    async (commentsListToDelete: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await clientAPIRequestDeleteCommentByAdmin(commentsListToDelete).then((res) => {
            thunkAPI.dispatch(setAlert({
                message: res.data.message || 'CommentItem Deleted',
                type: 'success'
            }))
            return commentsListToDelete

        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                message: 'Error While Deleting CommentItem',
                type: 'error',
                err
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default deleteCommentByAdminInPostPageAction