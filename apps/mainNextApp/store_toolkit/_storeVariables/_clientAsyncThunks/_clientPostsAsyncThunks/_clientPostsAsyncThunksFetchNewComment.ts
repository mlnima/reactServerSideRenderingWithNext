import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../../../clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";

const fetchNewComment = createAsyncThunk(
    'posts/fetchNewComment',
    async (commentData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const storeData = thunkAPI.getState()
        const body = {
            ...commentData,
        };
        await Axios.post(`/api/v1/posts/newComment`, body).then(()=>{
            const commentData = {
                ...body,
                //@ts-ignore
                author: storeData.user.userData
            }
            return commentData
        }).catch(() => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Something Went Wrong'
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export default fetchNewComment