import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import {clientAPIRequestPostNewComment} from "api-requests";

const postNewCommentAction = createAsyncThunk(
    'posts/postNewCommentAction',
    async (commentData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const storeData = thunkAPI.getState()
        clientAPIRequestPostNewComment(commentData)
            .then(()=>{
            const newCommentData = {
                ...commentData,
          //@ts-ignore
                author: storeData.user.userData
            }
            return newCommentData
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