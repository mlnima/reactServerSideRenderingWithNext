import {createAsyncThunk} from "@reduxjs/toolkit";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {reduceArrayOfDataToIds} from "@_variables/_variables";
import Axios from "@_variables/util/Axios";
import fetchUserEditingPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPost";

const fetchUserEditingPostUpdate = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (editedPost:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        // // console.log(editingPost)
        // const comments = editedPost.comments ? {comments: reduceArrayOfDataToIds(editedPost.comments)} : {}
        // const categories = editedPost.categories ? {categories: reduceArrayOfDataToIds(editedPost.categories)} : {}
        // const tags = editedPost.tags ? {tags: reduceArrayOfDataToIds(editedPost.tags)} : {}
        // const actors = editedPost.actors ? {actors: reduceArrayOfDataToIds(editedPost.actors)} : {}
        // //@ts-ignore
        // const author = data.author ? {author: data.author?._id} : {}
        //
        // const postData = {
        //     ...editedPost,
        //     ...comments,
        //     ...categories,
        //     ...author,
        //     ...tags,
        //     ...actors
        // }
        //
        // const body = {
        //     postData,
        //     token: localStorage.wt
        // };

        // for (const pair of editedPost.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        // console.log(editedPost.entries())
        // if (Object.keys(editingPostImagesToUpload).length === 0){
        //     console.log('has files to upload')
        // }else {
        //     console.log('has no file to upload')
        // }

        await Axios.post(`/api/v1/posts/userUpdatePost`, editedPost).then(res => {
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