import {createAsyncThunk} from "@reduxjs/toolkit";
import _metaPageQueryGenerator from "@_variables/clientVariables/_metaPageQueryGenerator";
import Axios from "@_variables/util/Axios";

const getTags = createAsyncThunk(
    'posts/getTags',
    async ({data}: { data: {} }, thunkAPI) => {
        try {
            const queries = _metaPageQueryGenerator(data, 'tags')
            const apiData = await Axios.get(`/api/v1/posts/tags${queries}`)
            return {
                tagsMetas: apiData?.data?.metas || [],
            }
        } catch (err) {

        }
    }
)

export default getTags