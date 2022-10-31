import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from "@_variables/Axios";

export const fixMetaImage = createAsyncThunk(
    'posts/likePost',
    async (_id: string, thunkAPI) => {
        const body = {
            _id,
            token: localStorage.wt
        };

        return await Axios.post('/api/v1/posts/fixMetaImage', body)
    }
)

export default fixMetaImage