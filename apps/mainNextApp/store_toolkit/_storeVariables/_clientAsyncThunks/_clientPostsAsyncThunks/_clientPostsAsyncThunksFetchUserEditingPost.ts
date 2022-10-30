import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";
import _postPageQueryGenerator from "@_variables/_clientVariables/clientVariables/_postPageQueryGenerator";

export const fetchUserEditingPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.get(`/api/v1/posts/clientGetEditingPost${_postPageQueryGenerator({_id})}`).then(res => {
            return res.data.post
        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default fetchUserEditingPost