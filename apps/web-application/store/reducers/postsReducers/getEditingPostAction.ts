import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import {clientAPIRequestGetEditingPost} from "@repo/api-requests";

export const getEditingPostAction = createAsyncThunk(
    'posts/getEditingPostAction',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await clientAPIRequestGetEditingPost(_id)
            .then(res => res.data.post)
            .catch(error => {})
            .finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default getEditingPostAction