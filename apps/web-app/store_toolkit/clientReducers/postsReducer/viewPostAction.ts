import {createAsyncThunk} from "@reduxjs/toolkit";
import viewPost from "api-requests/src/client/posts/viewPost";

export const viewPostAction = createAsyncThunk(
    'posts/viewPostAction',
    async (id: string, thunkAPI) => {
        return await viewPost(id)
    }
)

export default viewPostAction