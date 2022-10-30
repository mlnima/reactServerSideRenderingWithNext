import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../../../clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";

export const deleteCommentByAdminInPostPage = createAsyncThunk(
    'posts/deleteCommentByAdminInPostPage',
    async (commentsListToDelete: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await Axios.post(`/api/admin/posts/deleteComments`, {
            commentsIds: commentsListToDelete,
            token: localStorage.wt
        }).then((res) => {
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

export default deleteCommentByAdminInPostPage