import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestGetMetas} from "api-requests";

const getMetasAction = createAsyncThunk(
    'posts/getMetasAction',
    async ({data, metaType}: { data: {}, metaType: string }, thunkAPI) => {
        try {
            const apiData = await clientAPIRequestGetMetas(data, metaType)
            return {
                [`${metaType}Metas`]: apiData?.data?.metas || [],
                totalCount: apiData?.data?.totalCount || 0,
            }
        } catch (err) {

        }
    }
)

export default getMetasAction