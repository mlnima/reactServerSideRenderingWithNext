import {createAsyncThunk} from "@reduxjs/toolkit";
import getMetas from "api-requests/src/client/metas/getMetas";

const getMetasAction = createAsyncThunk(
    'posts/getMetasAction',
    async ({data, metaType}: { data: {}, metaType: string }, thunkAPI) => {
        try {
            const apiData = await getMetas(data, metaType)
            return {
                [`${metaType}Metas`]: apiData?.data?.metas || [],
                totalCount: apiData?.data?.totalCount || 0,
            }
        } catch (err) {

        }
    }
)

export default getMetasAction