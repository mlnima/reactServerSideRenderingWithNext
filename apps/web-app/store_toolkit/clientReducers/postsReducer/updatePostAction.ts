import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import userUpdatePost from "api-requests/src/client/posts/ugc/userUpdatePost";
import getEditingPostAction from "@store_toolkit/clientReducers/postsReducer/getEditingPostAction";

const updatePostAction = createAsyncThunk(
    'posts/updatePostAction',
    async (editedPost:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await userUpdatePost(editedPost).then(res => {
            if (res.data?.message) {
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))
            }
            thunkAPI.dispatch(getEditingPostAction(res.data.post._id))

        }).catch(error => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default updatePostAction