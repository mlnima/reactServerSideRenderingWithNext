import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import {clientAPIRequestLikePost} from "api-requests";

export const likePostAction = createAsyncThunk(
    'posts/likePostAction',
    async (id: string|undefined, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await clientAPIRequestLikePost(id)
            .then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default likePostAction