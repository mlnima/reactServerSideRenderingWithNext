import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import getEditingPost from "api-requests/src/client/posts/getEditingPost";

export const fetchUserEditingPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getEditingPost(_id)
            .then(res => res.data.post).catch(error => {
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default fetchUserEditingPost