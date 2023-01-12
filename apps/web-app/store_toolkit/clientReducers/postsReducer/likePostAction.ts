import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import likePost from "api-requests/src/client/posts/likePost";

export const likePostAction = createAsyncThunk(
    'posts/likePostAction',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await likePost(id)
            .then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default likePostAction