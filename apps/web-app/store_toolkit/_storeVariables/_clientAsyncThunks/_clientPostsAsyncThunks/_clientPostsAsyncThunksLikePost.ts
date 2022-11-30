import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import likePost from "api-requests/src/client/posts/likePost";

export const fetchLikePost = createAsyncThunk(
    'posts/likePost',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await likePost(id)
            .then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default fetchLikePost