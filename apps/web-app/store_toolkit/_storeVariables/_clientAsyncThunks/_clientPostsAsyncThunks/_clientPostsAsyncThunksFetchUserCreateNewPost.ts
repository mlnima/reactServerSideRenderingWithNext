import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import {PostRaw} from "typescript-types/src/Post";
import createNewPost from "api-requests/src/client/posts/ugc/createNewPost";

export const fetchUserCreateNewPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async ({data, push}: { data: PostRaw, push: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await createNewPost(data).then(res => {
                if (res.data?.post?._id) {
                    push(`/profile/post?id=${res.data.post._id}`)
                }
            }
        )
    }
)

export default fetchUserCreateNewPost