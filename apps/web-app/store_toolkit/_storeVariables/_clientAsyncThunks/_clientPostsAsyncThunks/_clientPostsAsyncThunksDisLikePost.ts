import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import disLikePost from "api-requests/src/client/posts/disLikePost";

export const fetchDisLikePost = createAsyncThunk(
    'posts/disLikePost',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await disLikePost(id)
            .then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default fetchDisLikePost