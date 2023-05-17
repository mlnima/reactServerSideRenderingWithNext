import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestGetPostComments} from "api-requests";

const getPostCommentsAction = createAsyncThunk(
    'posts/getPostCommentsAction',
    async (_id: string, thunkAPI) => {
        return await clientAPIRequestGetPostComments(_id)
            .then(res => {
                return res.data?.comments
            }).catch(err => {
                return []
            })
    }
)

export default getPostCommentsAction