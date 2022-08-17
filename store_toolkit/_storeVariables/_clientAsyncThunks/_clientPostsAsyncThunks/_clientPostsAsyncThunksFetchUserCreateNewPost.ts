import {createAsyncThunk} from "@reduxjs/toolkit";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {NextRouter} from "next/router";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {reduceArrayOfDataToIds} from "@_variables/_variables";
import Axios from "@_variables/util/Axios";

export const fetchUserCreateNewPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async ({data, router}: { data: PostTypes, router: NextRouter }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const comments = data.comments ? {comments: reduceArrayOfDataToIds(data.comments)} : {}
        const categories = data.categories ? {categories: reduceArrayOfDataToIds(data.categories)} : {}
        const tags = data.tags ? {tags: reduceArrayOfDataToIds(data.tags)} : {}
        const actors = data.actors ? {actors: reduceArrayOfDataToIds(data.actors)} : {}

        const postData = {
            ...data,
            ...comments,
            ...categories,
            ...tags,
            ...actors
        }
        const body = {
            postData,
            token: localStorage.wt
        };
        await Axios.post(`/api/v1/posts/userCreateNewPost`, body).then(res => {

                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))

                if (res.data?.post?._id) {
                    router.push(`/profile/post?id=${res.data.post._id}`)
                }
                // return res.data.post
            }
        )
    }
)

export default fetchUserCreateNewPost