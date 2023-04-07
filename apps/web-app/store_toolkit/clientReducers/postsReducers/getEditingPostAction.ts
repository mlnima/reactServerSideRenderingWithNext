import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import getEditingPost from "api-requests/src/client/posts/getEditingPost";

export const getEditingPostAction = createAsyncThunk(
    'posts/getEditingPostAction',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getEditingPost(_id)
            .then(res => res.data.post)
            .catch(error => {})
            .finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default getEditingPostAction