import {createAsyncThunk} from "@reduxjs/toolkit";
import resetMetaImage from "api-requests/src/client/metas/resetMetaImage";

export const fixMetaImage = createAsyncThunk(
    'posts/likePost',
    async (_id: string, thunkAPI) => {
        return await resetMetaImage(_id)
    }
)

export default fixMetaImage