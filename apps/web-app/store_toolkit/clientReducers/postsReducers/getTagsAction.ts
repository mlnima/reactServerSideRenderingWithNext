import {createAsyncThunk} from "@reduxjs/toolkit";
import getTags from "api-requests/src/client/posts/getTags";

const getTagsAction = createAsyncThunk(
    'posts/getTags',
    async ({data}:{data:{}}, thunkAPI) => {
        try {

            const apiData = await getTags(data)
            return {
                //@ts-ignore
                tagsMetas: apiData?.data?.metas || [],
            }
        } catch (err) {

        }
    }
)

export default getTagsAction