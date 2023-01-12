import {createAsyncThunk} from "@reduxjs/toolkit";
import {loading, setAlert} from "../globalStateReducer";
import postNewComment from "api-requests/src/client/comments/postNewComment";

const postNewCommentAction = createAsyncThunk(
    'posts/postNewCommentAction',
    async (commentData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const storeData = thunkAPI.getState()
        postNewComment(commentData)
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