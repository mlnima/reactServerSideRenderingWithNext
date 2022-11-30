import {createAsyncThunk} from "@reduxjs/toolkit";
import getPostComments from "api-requests/src/client/comments/getPostComments";

const fetchPostComments = createAsyncThunk(
    'posts/fetchPostComments',
    async (_id: string, thunkAPI) => {
        return await getPostComments(_id)
            .then(res => {
                return res.data?.comments
            }).catch(err => {
                return []
            })
    }
)

export default fetchPostComments