import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
        ratingData.likes = [...new Set([...ratingData.likes, id])]
        ratingData.disLikes = ratingData.disLikes.filter(disLiked => disLiked !== id)
        localStorage.setItem('ratingData', JSON.stringify(ratingData))

        const body = {
            id,
            type: 'likes'
        };

        return await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export default likePost