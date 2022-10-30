import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../../../clientReducers/globalStateReducer";
import {reduceArrayOfDataToIds} from "@_variables/custom-vaiables";
import Axios from "@_variables/util/Axios";
import fetchUserEditingPost
    from "./_clientPostsAsyncThunksFetchUserEditingPost";

const fetchUserEditingPostUpdate = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (editedPost:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const comments = editedPost.comments ? {comments: reduceArrayOfDataToIds(editedPost.comments)} : {}
        const categories = editedPost.categories ? {categories: reduceArrayOfDataToIds(editedPost.categories)} : {}
        const tags = editedPost.tags ? {tags: reduceArrayOfDataToIds(editedPost.tags)} : {}
        const actors = editedPost.actors ? {actors: reduceArrayOfDataToIds(editedPost.actors)} : {}
        // //@ts-ignore
        // const author = data.author ? {author: data.author?._id} : {}
        //
        const postData = {
            ...editedPost,
            ...comments,
            ...categories,
            // ...author,
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