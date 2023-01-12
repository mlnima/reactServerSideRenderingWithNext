import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading} from "../globalStateReducer";
import attendToEvent from "api-requests/src/client/posts/attendToEvent";

export const attendingToEvent = createAsyncThunk(
    'posts/attendToEvent',
    async ({postId,userId,actionType}: {postId:string,userId:string,actionType:string}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await attendToEvent(postId,userId,actionType)
            .then(res => res.data.updatedPost)
            .finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export default attendingToEvent