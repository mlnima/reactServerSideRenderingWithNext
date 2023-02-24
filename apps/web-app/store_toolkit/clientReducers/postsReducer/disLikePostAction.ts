import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import disLikePost from "api-requests/src/client/posts/disLikePost";

export const disLikePostAction = createAsyncThunk(
    'posts/disLikePostAction',
    async (id: string| undefined, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await disLikePost(id)
            .then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default disLikePostAction