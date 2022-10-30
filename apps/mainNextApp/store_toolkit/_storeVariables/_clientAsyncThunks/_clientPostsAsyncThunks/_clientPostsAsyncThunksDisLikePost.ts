import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import Axios from "@_variables/util/Axios";

export const disLikePost = createAsyncThunk(
    'posts/disLikePost',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const ratingData = localStorage?.ratingData ? JSON.parse(localStorage.ratingData) : {likes: [], disLikes: []};
        ratingData.disLikes = [...new Set([...ratingData.disLikes, id])]
        ratingData.likes = ratingData.likes.filter(liked => liked !== id)
        localStorage.setItem('ratingData', JSON.stringify(ratingData))

        const body = {
            id,
            type: 'disLikes'
        };

        return await Axios.post('/api/v1/posts/likeDislikeView', body).then(res => {
            return
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export default disLikePost