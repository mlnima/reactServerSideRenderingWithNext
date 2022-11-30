import {createAsyncThunk} from "@reduxjs/toolkit";
import viewPost from "api-requests/src/client/posts/viewPost";

export const fetchViewPost = createAsyncThunk(
    'posts/fetchViewPost',
    async (id: string, thunkAPI) => {
        return await viewPost(id)
    }
)

export default fetchViewPost