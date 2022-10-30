import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from "@_variables/util/Axios";

const fetchPostComments = createAsyncThunk(
    'posts/fetchPostComments',
    async (_id: string, thunkAPI) => {
        return await Axios.get(`/api/v1/posts/getComments?onDocument=${_id}`).then(res => {
            return res.data?.comments
        }).catch(err => {
            return []
        })
    }
)

export default fetchPostComments