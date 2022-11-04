import {createAsyncThunk} from "@reduxjs/toolkit";
import _metaPageQueryGenerator from "@_variables/_clientVariables/clientVariables/_metaPageQueryGenerator";
import Axios from "@_variables/Axios";

const fetchMetas = createAsyncThunk(
    'posts/fetchMetas',
    async ({data, metaType}: { data: {}, metaType: string }, thunkAPI) => {
        try {
            const queries = _metaPageQueryGenerator(data, metaType)
            const apiData = await Axios.get(`/api/v1/posts/getMetas${queries}`)
            return {
                [`${metaType}Metas`]: apiData?.data?.metas || [],
                totalCount: apiData?.data?.totalCount || 0,
            }
        } catch (err) {

        }
    }
)

export default fetchMetas