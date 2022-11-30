import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../../../clientReducers/globalStateReducer";
import fetchUserEditingPost
    from "./_clientPostsAsyncThunksFetchUserEditingPost";
import userUpdatePost from "api-requests/src/client/posts/ugc/userUpdatePost";

const fetchUserEditingPostUpdate = createAsyncThunk(
    'posts/fetchUserEditingPost',
    async (editedPost:any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await userUpdatePost(editedPost).then(res => {
            if (res.data?.message) {
                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'success',
                    message: res.data.message
                }))
            }
            thunkAPI.dispatch(fetchUserEditingPost(res.data.post._id))

        }).catch(error => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default fetchUserEditingPostUpdate