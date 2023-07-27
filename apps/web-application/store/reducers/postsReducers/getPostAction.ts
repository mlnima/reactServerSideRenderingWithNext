import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestGetPost} from "api-requests";

interface GetPostAction {
    identifier: string,
    options: {
        page: string
        setHeadData?: boolean
    },
    context: any
}

const getPostAction = createAsyncThunk(
    'posts/getPostAction',
    async ({context, identifier}: GetPostAction, thunkAPI) => {
        const apiData = await clientAPIRequestGetPost(identifier)
        return ({
            post: apiData?.data?.post || {},
            relatedPosts: apiData?.data?.relatedPosts || []
        })
    }
)


export default getPostAction