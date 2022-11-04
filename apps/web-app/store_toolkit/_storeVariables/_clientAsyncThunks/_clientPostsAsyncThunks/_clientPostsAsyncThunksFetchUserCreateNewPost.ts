import {createAsyncThunk} from "@reduxjs/toolkit";
import {NextRouter} from "next/router";
import {loading, setAlert} from "../../../clientReducers/globalStateReducer";
import {reduceArrayOfDataToIds} from "custom-util";
import Axios from "@_variables/Axios";
import {Post} from "typescript-types";

export const fetchUserCreateNewPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async ({data, push}: { data: Post, push: any }, thunkAPI) => {
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
                if (res.data?.post?._id) {
                    push(`/profile/post?id=${res.data.post._id}`)
                }
            }
        )
    }
)

export default fetchUserCreateNewPost