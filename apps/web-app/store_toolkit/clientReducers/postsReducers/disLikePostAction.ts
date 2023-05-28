import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import {clientAPIRequestDisLikePost} from "api-requests";

export const disLikePostAction = createAsyncThunk(
    'posts/disLikePostAction',
    async (id: string| undefined, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        if (id){
            return await clientAPIRequestDisLikePost(id)
                .then(res => {
                    return
                }).finally(() => thunkAPI.dispatch(loading(false)))
        }

    }
)

export default disLikePostAction