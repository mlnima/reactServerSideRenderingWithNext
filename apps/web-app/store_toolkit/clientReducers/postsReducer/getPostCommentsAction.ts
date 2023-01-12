import {createAsyncThunk} from "@reduxjs/toolkit";
import getPostComments from "api-requests/src/client/comments/getPostComments";

const getPostCommentsAction = createAsyncThunk(
    'posts/getPostCommentsAction',
    async (_id: string, thunkAPI) => {
        return await getPostComments(_id)
            .then(res => {
                return res.data?.comments
            }).catch(err => {
                return []
            })
    }
)

export default getPostCommentsAction