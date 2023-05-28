import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import {clientAPIRequestPostNewComment} from "api-requests";
import {Comment} from "typescript-types";

const postNewCommentAction = createAsyncThunk(
    'posts/postNewCommentAction',
    async (commentData: Comment, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const storeData = thunkAPI.getState()

        clientAPIRequestPostNewComment(commentData)
            .then(()=>{
                return {
                ...commentData,
                //@ts-ignore
                author: storeData.user.userData
            }
        }).catch(() => {
            thunkAPI.dispatch(setAlert({
                active: true,
                type: 'error',
                message: 'Something Went Wrong'
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))

    }
)

export default postNewCommentAction