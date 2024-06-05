import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestGetTags} from "@repo/api-requests";

const getTagsAction = createAsyncThunk(
    'posts/getTags',
    async ({data}:{data:{}}, thunkAPI) => {
        try {

            const apiData = await clientAPIRequestGetTags(data)
            return {
                //@ts-ignore
                tagsMetas: apiData?.data?.metas || [],
            }
        } catch (err) {

        }
    }
)

export default getTagsAction