import {createAsyncThunk} from "@reduxjs/toolkit";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {reduceArrayOfDataToIds} from "@_variables/_variables";
import Axios from "@_variables/util/Axios";
import fetchUserEditingPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPost";

const fetchUserEditingPostUpdate = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (data: PostTypes, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const comments = data.comments ? {comments: reduceArrayOfDataToIds(data.comments)} : {}
        const categories = data.categories ? {categories: reduceArrayOfDataToIds(data.categories)} : {}
        const tags = data.tags ? {tags: reduceArrayOfDataToIds(data.tags)} : {}
        const actors = data.actors ? {actors: reduceArrayOfDataToIds(data.actors)} : {}
        //@ts-ignore
        const author = data.author ? {author: data.author?._id} : {}

        const postData = {
            ...data,
            ...comments,
            ...categories,
            ...author,
            ...tags,
            ...actors
        }

        const body = {
            postData,
            token: localStorage.wt
        };

        await Axios.post(`/api/v1/posts/userUpdatePost`, body).then(res => {
            if (res.data?.message) {
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))

            }
            thunkAPI.dispatch(fetchUserEditingPost(res.data.post._id))

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default fetchUserEditingPostUpdate