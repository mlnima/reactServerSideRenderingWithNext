import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../../../clientReducers/globalStateReducer";
import {PostRaw} from "typescript-types/src/Post";
import createNewPost from "api-requests/src/client/posts/ugc/createNewPost";

export const fetchUserCreateNewPost = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async ({data}: { data: PostRaw }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await createNewPost(data).then(res => {
                if (res.data?.post?._id) {
                    window.location.href = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/profile/post?id=${res.data.post._id}`;
                }
            }
        )
    }
)

export default fetchUserCreateNewPost