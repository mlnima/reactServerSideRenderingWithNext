import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";

const fetchNewComment = createAsyncThunk(
    'posts/fetchNewComment',
    async (commentData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ...commentData,
        };
        await Axios.post(`/api/v1/posts/newComment`, body).catch(() => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Something Went Wrong'
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export default fetchNewComment