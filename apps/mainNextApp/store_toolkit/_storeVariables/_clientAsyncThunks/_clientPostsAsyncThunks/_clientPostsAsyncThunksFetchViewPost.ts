import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from "@_variables/util/Axios";

export const fetchViewPost = createAsyncThunk(
    'posts/fetchViewPost',
    async (id: string, thunkAPI) => {
        const body = {
            id,
            type: 'views'
        };
        return await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
            return
        })
    }
)

export default fetchViewPost