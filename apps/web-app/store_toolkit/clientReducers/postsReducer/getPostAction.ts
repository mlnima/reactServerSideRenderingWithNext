import {createAsyncThunk} from "@reduxjs/toolkit";
// import {setHeadData} from "../globalStateReducer";
// import {_postCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";
import getPost from "api-requests/src/client/posts/getPost";

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
        const apiData = await getPost(identifier)
        return ({
            post: apiData?.data?.post || {},
            relatedPosts: apiData?.data?.relatedPosts || []
        })
    }
)


export default getPostAction