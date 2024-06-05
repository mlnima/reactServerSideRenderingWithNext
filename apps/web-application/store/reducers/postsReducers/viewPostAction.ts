import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestViewPost} from "@repo/api-requests";

export const viewPostAction = createAsyncThunk(
    'posts/viewPostAction',
    async (id: string, thunkAPI) => {
        return await clientAPIRequestViewPost(id)
    }
)

export default viewPostAction